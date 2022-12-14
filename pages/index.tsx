import { Title, Grid } from '@mantine/core'
import axios from 'axios'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { HeroText } from '../components/Home/Hero'
import ProductCard from '../components/Products/ProductCard'
import { Product } from '../libs/types'

type Data = {
  products: [Product]
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  ctx
) => {
  const productsResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  )

  const products: [Product] = productsResponse.data

  return {
    props: {
      data: {
        products,
      },
    },
  }
}

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main>
        <Title>Produtos</Title>
        <Grid mt='md'>
          {data.products.map((product) => (
            <Grid.Col key={product.id} span={4}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      </main>
    </div>
  )
}

export default Home
