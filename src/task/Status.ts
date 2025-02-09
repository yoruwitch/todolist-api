export class Status {
  public static newTask = 0;
  public static ongoing = 1;
  public static finished = 2;

  public static getStatusDescription(status: number): string {
    const descriptions = {
      0: 'New task',
      1: 'Ongoing task',
      2: 'Finished task',
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return descriptions[status];
  }
}
