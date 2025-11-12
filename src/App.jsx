// src/App.jsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function App() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={4}>
        Hello Chakra UI 👋
      </Heading>
      <Text color="gray.500" mb={6}>
        Ini project React JSX biasa, bukan TypeScript.
      </Text>
      <Button colorScheme="teal" size="lg">
        Click Me
      </Button>
    </Box>
  );
}
