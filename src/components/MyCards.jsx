
import { Card, Text } from '@mantine/core';

export default function MyCard({ title, description }) {
  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 350 }}>
      <Text weight={500} size="lg">{title}</Text>
      <Text color="dimmed" size="sm">{description}</Text>
    </Card>
  );
}
