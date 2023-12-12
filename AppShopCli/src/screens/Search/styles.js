const {StyleSheet} = require('react-native');

const SearchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchHeaderView: {
    alignSelf: 'center',
    width: '85%',
    marginVertical: '2%',
    height: 45,
    padding: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  searchPlaceholder: {
    marginLeft: '5%',
    fontSize: 15,
    color: 'gray',
  },
  imageContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHeader: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    height: 45,
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingLeft: '3%',
    marginRight: '4%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: '2%',
    color: 'black',
  },
  cancelText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
    marginRight: '5%',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageText: {
    marginTop: '5%',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchItem: {
    padding: 5,
    height: 40,
    marginBottom: '1%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',
  },
  searchText: {
    left: '20%',
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreenStyles;
