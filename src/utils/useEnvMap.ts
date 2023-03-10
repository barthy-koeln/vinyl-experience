import { HalfFloatType, PMREMGenerator, Texture, WebGLRenderer } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export async function useEnvMap (renderer: WebGLRenderer): Promise<Texture> {
  const pmremGenerator = new PMREMGenerator(renderer)
  const rgbeLoader = new RGBELoader()

  pmremGenerator.compileEquirectangularShader()
  return new Promise(function (resolve, reject) {
    rgbeLoader
      .setDataType(HalfFloatType)
      .load('/envmap/brown_photostudio_02_1k.hdr',
        function (texture) {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture

          texture.dispose()
          pmremGenerator.dispose()

          resolve(envMap)
        },
        undefined,
        reject
      )
  })
}