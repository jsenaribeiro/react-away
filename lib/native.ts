export interface IRegistry {
   registerComponent(appName: string, getComponent: Function): string
}

export class ReactNative {
   public static registry(registry: IRegistry, name: string, component: () => JSX.Element) {
      registry.registerComponent(name, component)
      throw registry
   }
}