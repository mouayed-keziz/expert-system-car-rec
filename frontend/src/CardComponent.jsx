import { Card, Image, Text } from '@mantine/core';

export default function CardComponent({ img, header, text, isBlackAndWhite }) {
    return (
        <Card
            shadow="sm"
            padding="xl"
            component="a"
            target="_blank"
        >
            <Card.Section>
                <Image
                    sx={{
                        filter: isBlackAndWhite ? "grayscale(100%)" : "none"
                    }}
                    src={img}
                    height={200}
                    alt={header}
                />
            </Card.Section>

            <Text weight={500} size="lg" mt="md">
                {header}
            </Text>

            <Text mt="xs" color="dimmed" size="sm">
                {text}
            </Text>
        </Card>
    );
}