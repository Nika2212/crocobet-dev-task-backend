export class Logger {
  public static Info(message: string, module: string = "UNKNOWN"): void {
    const time = `[${new Date().toLocaleTimeString()}]`;
    const moduleName = `[${module}]`;
    const row = `INFO - ${time} ${moduleName} : ${message}`;

    console.log(row);
  }

  public static Warn(message: string, module: string = "UNKNOWN"): void {
    const time = `[${new Date().toLocaleTimeString()}]`;
    const moduleName = `[${module}]`;
    const row = `WARN - ${time} ${moduleName} : ${message}`;

    console.warn(row);
  }

  public static Error(message: string, module: string = "UNKNOWN"): void {
    const time = `[${new Date().toLocaleTimeString()}]`;
    const moduleName = `[${module}]`;
    const row = `ERROR - ${time} ${moduleName} : ${message}`;

    console.error(row);
  }
}
