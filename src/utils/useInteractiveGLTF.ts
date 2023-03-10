import { useCompressedGLTFLoader } from '@/utils/useCompressedGLTFLoader'
import { AnimationMixer, Box3, Light, Mesh, Object3D, PerspectiveCamera, Scene } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface InteractiveGltf {
  camera: PerspectiveCamera,
  cameraTarget: Object3D,
  navMesh: Object3D,
  clipsMixer: AnimationMixer,
  initialBox: Box3,
  interactiveObjects: Object3D[],
  setAnimationTime: (timeInSeconds: number) => AnimationMixer
  startAnimations: () => void
  stopAnimations: () => void
}

export async function useInteractiveGLTF (url: string, interactiveElementNames: string[], scene: Scene, anisotropy: number): Promise<InteractiveGltf> {
  const gltfLoader = useCompressedGLTFLoader()
  const adjustableMaps = ['map', 'normalMap', 'roughnessMap', 'metalnessMap']

  function prepareObjectForInteractivity (object: Object3D) {
    object.userData.initialPosition = object.position.clone()
  }

  function adjustVisibleItem (child: Object3D) {
    if (child instanceof Light) {
      child.intensity *= .01
      child.castShadow = true
      child.shadow.mapSize.width = 1024
      child.shadow.mapSize.height = 1024
      child.shadow.bias = -0.005
      return
    }

    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material.envMapIntensity = .5

      for (const map of adjustableMaps) {
        const texture = child.material[map]

        if (texture) {
          texture.anisotropy = anisotropy
        }
      }
    }
  }

  const onLoad = (resolve: Function, interactiveElementNames: string[], interactiveObjects: Object3D[]) => (gltf: GLTF) => {
    for (const objectName of interactiveElementNames) {
      const object = gltf.scene.getObjectByName(objectName)
      if (!object) {
        continue
      }

      prepareObjectForInteractivity(object)
      interactiveObjects.push(object)
    }

    const initialBox = new Box3().setFromObject(gltf.scene)
    const camera = gltf.scene.getObjectByName('camera') as PerspectiveCamera
    const cameraTarget = gltf.scene.getObjectByName('cameraTarget') as Object3D
    const navMesh = gltf.scene.getObjectByName('navMesh') as Object3D

    navMesh.visible = false

    gltf.scene.traverseVisible(adjustVisibleItem)
    scene.add(gltf.scene)

    const clipsMixer = new AnimationMixer(gltf.scene)
    const actions = gltf.animations.map(clip => clipsMixer.clipAction(clip))

    for (const action of actions) {
      action.play()
    }

    resolve({
      camera,
      cameraTarget,
      navMesh,
      clipsMixer,
      initialBox,
      interactiveObjects,
      setAnimationTime: clipsMixer.setTime.bind(clipsMixer),
      startAnimations: () => {
        for (const action of actions) {
          action.play()
        }
      },
      stopAnimations: () => {
        for (const action of actions) {
          action.stop()
        }
      }
    })
  }

  const interactiveObjects = [] as Object3D[]

  return new Promise<InteractiveGltf>(function (resolve, reject) {
    gltfLoader.load(
      url,
      onLoad(resolve, interactiveElementNames, interactiveObjects),
      undefined,
      reject
    )
  })
}