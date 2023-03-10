import '@/utils/mesh-bvh'
import { Object3D, Raycaster } from 'three'
import type { SetupContext } from 'vue'

function getClosestInteractiveParent (intersectionTargets: Object3D[], object: Object3D | null): Object3D | null {
  while (object) {
    if (intersectionTargets.includes(object)) {
      return object
    }

    if (object.parent) {
      object = object.parent
      continue
    }

    object = null
  }

  return object
}

export function useBVHRaycaster (context: SetupContext) {
  const raycaster = new Raycaster()
  raycaster.firstHitOnly = true

  let enabled = false

  return {
    raycaster,

    startRaycasting () {
      enabled = true
    },

    stopRaycasting () {
      enabled = false
    },

    /**
     * ! do not use reactivity here
     */
    updateIntersections (intersectionTargets: Object3D[], hoverObject: Object3D | null) {
      if (!enabled) {
        return
      }

      const intersects = raycaster.intersectObjects(intersectionTargets)

      if (!intersects.length) {
        if (hoverObject) {
          context.emit('update:hover', null)
        }

        return
      }

      const firstIntersection = intersects[0]
      const interactiveParent = getClosestInteractiveParent(intersectionTargets, firstIntersection.object)

      if (interactiveParent?.uuid !== hoverObject?.uuid) {
        context.emit('update:hover', interactiveParent)
      }
    }
  }
}