import { AspectRatio, Button, Card, Center, Container, Group, Image, Skeleton, Space, Title } from "@mantine/core";
import { useContext, useState } from "react";
import { ResultContext } from "../context/result-context";
import { useNavigate, Navigate } from "react-router-dom"

export default function ResultPage() {
    const { result, dispatch } = useContext(ResultContext)
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            {result ? (
                <Container mt={50}>
                    <Card shadow="sm" padding="lg" radius="md" miw={"350px"} withBorder>
                        <Center mb="lg">
                            <Title mb="lg" order={1}>RESULT : </Title>
                        </Center>

                        <Title mb="lg" order={3}>{result.name} </Title>

                        <Image style={{ display: imageLoaded ? "block" : "none" }} onLoad={() => setImageLoaded(true)} src={result.img} />
                        {!imageLoaded && (
                            <AspectRatio ratio={16 / 9} mb="lg" w={"100%"}>
                                <Skeleton height="100%" />
                            </AspectRatio>
                        )}
                        <Space h={30} />

                        <Group position="right">
                            <Button variant="outline"
                                onClick={() => {
                                    dispatch({ type: "SET_RESULT", payload: {} })
                                    navigate("/");
                                }}
                            >HOME</Button>
                        </Group>
                    </Card>
                </Container >
            ) : (
                <Navigate to="/" />
            )}
        </>
    )
}