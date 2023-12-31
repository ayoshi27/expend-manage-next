import { gql, useQuery } from "@apollo/client";

const AllCustomCountingItemsQuery = gql`
  query {
    customCountingItem {
      id
      name
      terms {
        id
        sign
        coefficient
        categories {
          category {
            id
          }
        }
        budgets {
          budget {
            id
          }
        }
        payers {
          payer {
            id
          }
        }
        paymentMethods {
          paymentMethod {
            id
          }
        }
        processed
      }
    }
  }
`;

/** 登録されているすべてのカスタム集計項目を取得する */
export function useAllCustomCountingItemsQuery() {
  const {
    data,
    loading: loadingCustomCountingItems,
    error: errorWhileLoadingCustomCountingItems,
  } = useQuery(AllCustomCountingItemsQuery);

  return {
    customCountingItems: data?.customCountingItem,
    loadingCustomCountingItems,
    errorWhileLoadingCustomCountingItems,
  };
}
