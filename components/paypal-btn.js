import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";

const ButtonWrapper = ({ type, onApprove,plan_id }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-82F18814AM2691041MMWZNLA",
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      style={{
        label: "subscribe",
      }}
      onApprove={onApprove}
      
    />
  );
};
export default ButtonWrapper;
