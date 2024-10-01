import { View } from 'react-native';
import QuotesApp from './src/components/quotesApp'; 

export default function App() {
  return (
    <View className='flex flex-1 items-center justify-center'>
      <QuotesApp />
    </View>
  );
}
