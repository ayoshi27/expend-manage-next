import dayjs from "dayjs";
import styles from "./addExpendsDialog.module.scss";
import { useState } from "react";

export default function AddExpendsDialog(props: {
  dialog: any;
  isLoading: boolean;
  categories: any;
  payers: any;
  budgets: any;
  paymentMethods: any;
  addExpend: (variables: {
    date: string;
    price: number;
    description: string;
    categoryId: number;
    payerId: number;
    budgetId: number;
    paymentMethodId: number;
    processed: boolean;
  }) => Promise<void>;
}) {
  const {
    dialog: Dialog,
    isLoading,
    categories,
    budgets,
    paymentMethods,
    addExpend,
  } = props;

  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(Number(categories[0].id));
  const [budgetId, setBudgetId] = useState(Number(budgets[0].id));
  const [paymentMethodId, setPaymentMethodId] = useState(
    Number(paymentMethods[0].id)
  );
  const [isProcessed, setIsProcessed] = useState(false);

  /** 保存ボタンを押した時の処理 */
  function handleSaveButton(): void {
    addExpend({
      date,
      price: Number(price),
      description,
      categoryId,
      payerId: findPayerIdForPaymentMethodId(paymentMethodId),
      budgetId,
      paymentMethodId,
      processed: isProcessed,
    });
    resetFormValue();
  }

  // NOTE: stringかnumber型で引数を受け取れるようにしてhelper関数として切り出したい
  function findPayerIdForPaymentMethodId(paymentMethodId: number): number {
    return paymentMethods.find((method: any) => method.id === String(paymentMethodId))
      .payerId;
  }

  /** フォームの値をリセットする */
  function resetFormValue(): void {
    setDate(dayjs().format("YYYY-MM-DD"));
    setPrice("0");
    setDescription("");
    setCategoryId(Number(categories[0].id));
    setBudgetId(Number(budgets[0].id));
    setPaymentMethodId(Number(paymentMethods[0].id));
    setIsProcessed(false);
  }

  return (
    <Dialog isLoading={isLoading}>
      <h2 className={styles.dialogTitle}>支出を追加</h2>

      <div className={styles.formItem}>
        日付:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>

      <div className={styles.formItem}>
        料金:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
        />
      </div>

      <div className={styles.formItem}>
        内容:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>

      <div className={styles.formItem}>
        カテゴリー:
        <select onChange={(e) => setCategoryId(Number(e.currentTarget.value))}>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formItem}>
        支払方法:
        <select
          onChange={(e) => setPaymentMethodId(Number(e.currentTarget.value))}
        >
          {paymentMethods.map((paymentMethod: any) => (
            <option key={paymentMethod.id} value={paymentMethod.id}>
              {paymentMethod.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formItem}>
        支出元:
        <select onChange={(e) => setBudgetId(Number(e.currentTarget.value))}>
          {budgets.map((budget: any) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formItem}>
        精算済:
        <label
          htmlFor="processed-checkbox"
          className={styles.processedCheckboxWrapper}
        >
          <input
            type="checkbox"
            id="processed-checkbox"
            checked={isProcessed}
            onChange={(e) => setIsProcessed(e.currentTarget.checked)}
          />
        </label>
      </div>

      <button className={styles.saveButton} onClick={handleSaveButton}>
        追加
      </button>
    </Dialog>
  );
}
