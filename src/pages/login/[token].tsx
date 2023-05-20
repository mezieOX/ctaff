import axios from "axios";
import Login from ".";

const TokenLogin = () => {

  return (
    <Login />
  );
};

export default TokenLogin;

export async function getServerSideProps(context: any) {
  const {
    params: { token },
  } = context;

  const url = process.env.API_URL;

  try {
    const res = await axios.post(`${url}/users/loginTokenValidate`, {
      token
    })
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };

  } catch (err: any) {
    if(err.response.status == 401){
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
  

  return {
    props: {
      token,
    },
  };
}

