import { useCompressedGLTFLoader } from '@/utils/useCompressedGLTFLoader'
import { AnimationMixer, Box3, Mesh, Object3D, PerspectiveCamera, Scene } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface InteractiveGltf {
  camera: PerspectiveCamera,
  cameraTarget: Object3D,
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
    if (child.name === 'infinitePlane') {
      return
    }

    if (child instanceof Mesh) {
      child.material.envMap = scene.environment
      child.material.envMapIntensity = 1

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
    const camera = gltf.scene.getObjectByName('Camera') as PerspectiveCamera
    const cameraTarget = gltf.scene.getObjectByName('Empty') as PerspectiveCamera

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