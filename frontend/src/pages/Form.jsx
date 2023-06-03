import { Button, Card, Center, Container, Grid, Group, Radio, Space, Stack, Text, Title } from "@mantine/core";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ResultContext } from "../context/result-context"
import { notifications } from '@mantine/notifications';


export default function FormPage() {

    const navigate = useNavigate();
    const { dispatch } = useContext(ResultContext)

    const [country, setcountry] = useState("")
    const [cartype, setcartype] = useState("")
    const [fuel, setfuel] = useState("")
    const [money, setmoney] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        // if anything is empty
        if (!country || !cartype || !fuel || !money) {
            notifications.show({
                title: 'Error',
                message: 'fill all the options',
                color: 'red',
            })
            return;
        }

        const formToPost = {
            country,
            cartype,
            fuel,
            money
        }
        axios.post("http://127.0.0.1:5000/", formToPost).then((result) => {
            console.log(result.data);
            dispatch({ type: "SET_RESULT", payload: result.data })
            navigate("/result");
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <Container my={"lg"}>
                <Card shadow="sm" padding="lg" radius="md" miw={"350px"} withBorder>
                    <Center mb="xl">
                        <Title align="center" c="blue" order={1}>GET ME A CAR</Title>
                    </Center>

                    <Grid>
                        <Grid.Col span={6}>
                            <CarType cartype={cartype} setcartype={setcartype} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Fuel fuel={fuel} setfuel={setfuel} />
                        </Grid.Col>
                    </Grid>

                    <Space my={50} />

                    <Grid>
                        <Grid.Col span={6}>
                            <Country country={country} setcountry={setcountry} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <PriceRange money={money} setmoney={setmoney} />
                        </Grid.Col>
                    </Grid>

                    <Group mt="xl" position="right" >
                        <Button variant="outline" onClick={handleSubmit} >SUBMIT</Button>
                    </Group>

                </Card>
            </Container >
        </>
    );
}



function CarType({ cartype, setcartype }) {
    return (
        <>
            <Text fz="xl" fw="bold">Choose the type of the car</Text>
            <Radio.Group
                value={cartype}
                onChange={setcartype}
                mt="xl">
                <Stack mt="lg">
                    <Radio value="sport" label="sport" />
                    <Radio value="populaire" label="populaire" />
                    <Radio value="commercial" label="commercial" />
                    <Radio value="haute gamme" label="haute gamme" />
                </Stack>
            </Radio.Group>
        </>
    );
}

function Fuel({ fuel, setfuel }) {
    return (
        <>
            <Text fz="xl" fw="bold">Choose fuel</Text>
            <Radio.Group mt="xl"
                value={fuel}
                onChange={setfuel}
            >
                <Stack mt="lg">
                    <Radio value="electric" label="electric" />
                    <Radio value="essence" label="essence" />
                    <Radio value="dsl" label="dsl" />
                </Stack>
            </Radio.Group>
        </>
    );
}


function PriceRange({ money, setmoney }) {
    return (
        <>
            <Text fz="xl" fw="bold">Choose price range</Text>
            <Radio.Group mt="xl"
                value={money}
                onChange={setmoney}
            >
                <Stack mt="lg">
                    <Radio value="[30-70]" label="Entry" />
                    <Radio value="[70-180]" label="Mid" />
                    <Radio value="[180-600]" label="High" />
                </Stack>
            </Radio.Group>
        </>
    );
}


function Country({ country, setcountry }) {
    return (
        <>
            <Text fz="xl" fw="bold">Chouse the manifactoring country</Text>
            <Radio.Group mt="xl"
                value={country}
                onChange={setcountry}
            >
                <Stack mt="lg">
                    <Radio value="france" label="france" />
                    <Radio value="japon" label="japon" />
                    <Radio value="allemangne" label="allemangne" />
                    <Radio value="USA" label="USA" />
                </Stack>
            </Radio.Group>
        </>
    );
}