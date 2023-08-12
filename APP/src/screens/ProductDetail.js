
  import React from 'react';
  import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

  const ProductDetail =({ route, navigation }) =>{
    const { item } = route.params;

  

  return (
    <View style={styles.container}> 
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `http://localhost:3000/${encodeURIComponent(item.image)}` }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Product Details</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>ID Product:</Text>
          <Text style={styles.value}>{item._id}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>ID Cart:</Text>
          <Text style={styles.value}>{item.cartId}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{item.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{item.price} VNĐ</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{item.quantity}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Content:</Text>
          <Text style={styles.value}>{item.content}</Text>
        </View>


      </View>

    </View>
  );
}
export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
