import { View } from "react-native"
import CustomButton from "./CustomButton";

const Payment = () => {
    const openPaymentSheet = async() => {}
    return (
        <View>
            <CustomButton title="Confirm Ride" className="my-10" onPress={openPaymentSheet} />

        </View>
    )
};
export default Payment;