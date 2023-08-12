import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Alert, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { userId } from "./mainScreens/MainScreen";
import { FontAwesome } from '@expo/vector-icons';
// export default function ScreenCart({ route }) {
//   const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
export default function ScreenCart({ route }) {
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCashPayment, setCashPayment] = useState(true);
  const URL = `http://localhost:3000/api/orders/:userId`;
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [info, setInfo] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);



  // request to server
  const postDataToServer = async (data) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Xử lý thành công
        console.log('Dữ liệu đã được gửi thành công lên máy chủ');
      } else {
        // Xử lý lỗi
        console.log('Có lỗi xảy ra khi gửi dữ liệu lên máy chủ');
      }
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };
  


  
  useEffect(() => {
    setCartItems(route.params?.cartItems || []);
  }, [route.params]);


  useEffect(() => {
    updateTotalPrice();
  }, [cartItems, quantity]);

  const updateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const itemQuantity = quantity[item._id] || 1;
      total += item.price * itemQuantity;
    });
    setTotalPrice(total);
  };
  const handlePaymentConfirm = async () => {
    // Thực hiện xử lý thanh toán và thông tin đơn hàng
    console.log("Họ tên: ", name);
    console.log("Số điện thoại: ", phoneNumber);
    console.log("Địa chỉ: ", address);
    console.log("Phương thức thanh toán: ", isCashPayment ? 'Chuyển tiền mặt' : 'Chuyển tiền online');
    console.log("Sản phẩm đã chọn: ", cartItems);
    console.log("Tổng số tiền: ", totalPrice);
    try {
      // Gửi thông tin đơn hàng và sản phẩm đến server
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          address,
          paymentMethod: isCashPayment ? 'cash' : 'online',
          cartItems,
          totalPrice,
        }),
      });

      if (response.ok) {
        // Đơn hàng đã được gửi thành công
        setOrderSuccess(true);
        setModalVisible(false);
      } else {
        // Xử lý lỗi nếu gửi đơn hàng thất bại
        // ...
        Alert.alert('Lỗi', 'Gửi đơn hàng thất bại');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Gửi đơn hàng thất bại');
    }
    setModalVisible(false);
  };

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };
  const handleConfirmPress = async () => {
    if (info === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập thông tin trước khi xác nhận.');
      return;
    }

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info }),
      });

      if (response.ok) {
        Alert.alert('Thành công', 'Xác nhận thành công!');
      } else {
        Alert.alert('Thất bại', 'Xác nhận không thành công!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối đến server.');
    }

    setInfo('');
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handlePaymentMethodChange = (method) => {
    setCashPayment(method === 'cash');
  };
  const handleBackgroundPress = () => {
    // Alert.alert('Thông báo', 'Bạn đã ấn ngoài background', [{ text: 'OK' }]);
    setModalVisible(false);
  };

  // const handleBuyItems = async () => {
  //   // Thực hiện hành động mua hàng
  //   console.log("Mua hàng");
  //   const response = await fetch('/create-checkout-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });
  //   const session = await response.json();
  //   if (session && session.id) {
  //     // Chuyển hướng khách hàng đến trang thanh toán của Stripe
  //     const stripe = Stripe('YOUR_STRIPE_API_KEY');
  //     stripe.redirectToCheckout({ sessionId: session.id });
  //   }
  // };
  const handleBuyItems = () => {
    setModalVisible(true);
  };
  const handleQuantityChange = (itemId, value) => {
    const item = cartItems.find((item) => item._id === itemId);
    const maxQuantity = item ? item.quantity : 1;

    if (value > maxQuantity) {
      value = maxQuantity; // Giới hạn giá trị nhập vào là số lượng hiện có
    }

    if (value === 1) {
      setQuantity((prevQuantity) => {
        const updatedQuantity = { ...prevQuantity };
        delete updatedQuantity[itemId]; // Xóa khóa itemId nếu giá trị là 0
        return updatedQuantity;
      });
    } else {
      setQuantity((prevQuantity) => ({ ...prevQuantity, [itemId]: value }));
    }
  };

  const renderItem = ({ item }) => {
    const itemQuantity = quantity[item._id] || 1;


    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            source={{ uri: `http://localhost:3000/${encodeURIComponent(item.image)}` }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemInfoContainer}>
          {/* <Text style={styles.itemText}>Card ID:{item.cartId}</Text> */}
          <Text style={styles.itemText}>Name: {item.name}</Text>
          <Text style={styles.itemText}>Price: {item.price} VNĐ</Text>
          <TextInput
            style={styles.quantityInput}
            value={itemQuantity.toString()}
            onChangeText={(value) => handleQuantityChange(item._id, parseInt(value))}
            keyboardType="numeric"
          />

        </View>
      </View>
    );
  };

  return (
    <View style={styles.modalBackground} >
      <Modal visible={isModalVisible} animationType="fade" transparent >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thông tin đặt hàng</Text>
            {/* Hiển thị sản phẩm đã chọn */}
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.modalItemContainer}>
                  <Image
                    style={styles.modalItemImage}
                    source={{ uri: `http://localhost:3000/${encodeURIComponent(item.image)}` }}
                    resizeMode="contain"
                  />
                  <View style={styles.modalItemInfo}>
                    <Text style={styles.modalItemText}>Name: {item.name}</Text>
                    <Text style={styles.modalItemText}>Price: {item.price} VNĐ</Text>
                  </View>
                </View>
              )}
            />

            {/* Tổng số tiền */}
            <Text style={styles.modalTotalPrice}>Tổng số tiền: {totalPrice} VNĐ</Text>

            {/* Form nhập thông tin */}
            <TextInput
              style={styles.modalTextInput}
              placeholder="Họ tên"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder="Địa chỉ"
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentMethodText}>Phương thức thanh toán:</Text>
              <View>
                <TouchableOpacity
                  style={[styles.paymentMethodButton, isCashPayment ? styles.paymentMethodButtonSelected : null]}
                  onPress={() => handlePaymentMethodChange('cash')}
                >
                  <Text style={styles.paymentMethodButtonText}>Chuyển tiền mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.paymentMethodButton, !isCashPayment ? styles.paymentMethodButtonSelected : null]}
                  onPress={() => handlePaymentMethodChange('online')}
                >
                  <Text style={styles.paymentMethodButtonText}>Chuyển tiền online</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Xác nhận thanh toán */}
            <TouchableOpacity style={styles.modalButton} onPress={handlePaymentConfirm}>
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>

            {/* Đóng modal */}
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleBackgroundPress}>
              <FontAwesome name="times" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.modalBackground} onPress={handleBackgroundPress} /> */}
        </View>
      </Modal>
      {cartItems.length > 0 ? (
        <>
          <FlatList data={cartItems} keyExtractor={(item) => item._id} renderItem={renderItem} />
          <Text style={styles.totalPriceText}>Tổng số tiền: {totalPrice} VNĐ</Text>
          <TouchableOpacity style={styles.button} onPress={handleBuyItems}>
            <Text style={styles.buttonText}>Thanh toán</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  deleteText: {
    color: 'red',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  modalItemInfo: {
    marginLeft: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  paymentMethodText: {
    fontSize: 16,
  },
  paymentMethodButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginLeft: 10,
  },
  paymentMethodButtonText: {
    fontSize: 16,
  },
  paymentMethodButtonSelected: {
    backgroundColor: '#cccccc',
  },
  modalButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});
