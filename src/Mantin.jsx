import '@mantine/core/styles.css'
import { MantineProvider, Button, Text } from '@mantine/core';
import MyCard from './components/MyCards';
import Demo from './components/Demo';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div style={{ padding: 20 }}>
        <Text size="xl">Hello Mantine!</Text>
        <Button>Click me</Button>
      </div>
      <MyCard title="Makan" description="Semuanya enak"/>
      
    </MantineProvider>
  );
}

export default App;