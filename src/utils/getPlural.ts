export type OneMany = readonly [string, string];
export type OneFewMany = readonly [string, string, string];

/**
 * Возвращает подходящую форму множественного числа.
 * @example getPlural(2, "час", "часа", "часов") // часа
 * @example getPlural(21, "%d час", "%d часа", "%d часов") // 21 час
 * @example getPlural(14, "Удалить запись", "Удалить всё") // Удалить всё
 */
export function getPlural(
  num: number,
  /** 1, 21, 31... (кроме 11) */
  one: string,
  /** 2, 23, 44... (кроме 12, 13, 14) */
  few: string,
  many: string,
): string;
export function getPlural(value: number, one: string, many: string): string;
export function getPlural(value: number, forms: OneMany | OneFewMany): string;
export function getPlural(
  value: number,
  ...args: readonly string[] | [readonly string[]]
) {
  const num = Math.abs(value);
  const forms = args.flat();

  if (forms.length === 2) {
    const [one, many] = forms;
    return num === 1
      ? one.replace("%d", `${num}`)
      : many.replace("%d", `${num}`);
  }

  const [one, few, many] = forms;

  if (num % 10 === 1 && num % 100 !== 11) {
    return one.replace("%d", `${num}`);
  }
  if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return few.replace("%d", `${num}`);
  }
  return many.replace("%d", `${num}`);
}
