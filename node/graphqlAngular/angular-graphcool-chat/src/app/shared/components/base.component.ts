export class BaseComponent<T extends { id: string }> {

  trackByFn(index: number, item: T): number | string {
    return item.id;
  }
}
