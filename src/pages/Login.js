import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    fetch("https://api-volunteers.fhn.gov.az/api/v1/Auth", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const token = data.data.token;
        const payload = jwtDecode(token);
        console.log(payload);
        console.log("Login successful:", data);
        navigate("/Volunteers");
        // Handle successful login (e.g., update state, redirect)
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError(
          "Daxil olmaq alınmadı. Zəhmət olmasa, məlumatları bir daha yoxlayın yoxlayın."
        );
      });
  };
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: " #4B7D83",

        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="login-wrapper"
        style={{
          width: "600px",
          height: "500px",
          margin: "0px",
          position: "absolute",
          color: "white",
          top: "50%",
          left: "50%",
          borderRadius: "30px",
          backgroundColor: " rgba(255,255,255,0.7)",

          transform: "translate(-50%, -50%)",
          backdropFilter: " blur(10px)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.2)",
          padding: "50px 35px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <img src={logo} style={{width:"140px"}}/> */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 66 87"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3_874)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.9349 26.3112L39.769 38.1681L26.2526 38.1996L32.9349 26.3112ZM31.4362 26.3301C30.3338 26.5852 29.4018 26.9852 28.6214 27.5237C27.4819 28.3079 27.3704 28.5598 26.5963 29.5424C24.6733 31.983 24.5711 35.8251 26.4105 38.6783C28.0641 41.2417 31.4145 42.7628 34.6411 42.1109C38.7781 41.2732 41.627 36.8612 40.7661 32.5404C40.0199 28.8054 36.0501 25.2626 31.4362 26.3301Z"
              fill="#E57817"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M26.2526 38.1996L39.769 38.1681L32.9349 26.3112L26.2526 38.1996Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.7553 53.8922C45.6185 53.8922 43.293 51.1398 39.5864 53.0324C38.3973 53.6402 38.4159 53.5804 38.0536 54.9503C37.747 56.1124 36.6416 59.3466 36.5673 60.241C37.6975 60.241 36.9358 60.1056 38.7596 58.2381C40.4534 56.4997 42.7882 56.273 44.7174 57.5484C46.1418 58.4901 45.8105 58.7294 46.9748 58.7294C51.1242 58.7294 55.9486 53.8135 56.1901 50.8689C55.7164 51.1901 55.3726 51.631 54.8122 52.0373C53.1989 53.212 50.9848 53.8922 48.7553 53.8922Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.2306 11.7146C23.1344 11.7146 22.4532 11.5288 21.6016 11.0627C20.4869 10.4517 20.2949 10.0675 19.8799 9.77781C18.8581 9.06609 14.9347 10.7541 13.4236 12.061C11.9868 13.3081 9.97096 15.67 9.80994 17.6099C10.293 17.2824 10.5407 16.8982 11.0795 16.4825C12.9653 15.0307 15.0927 14.5867 17.5389 14.5867C20.4249 14.5867 22.4098 17.0368 26.0823 15.5629C28.1508 14.7347 27.8474 13.5821 28.8569 10.373C29.0148 9.87544 29.3864 8.811 29.4328 8.23784C28.2561 7.95756 29.2222 8.32287 27.2435 10.2439C26.5964 10.8737 25.4135 11.7146 24.2306 11.7146Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.8504 43.0085C10.8504 44.265 10.7792 44.8508 10.1041 46.0286L8.87479 47.7858C8.57752 48.6865 9.55293 51.3665 10.0855 52.4058C11.3304 54.8338 14.0367 57.2052 16.6502 57.8256C16.0464 56.906 15.4364 56.7013 14.6158 54.9062C11.4666 48.0157 17.189 45.742 14.269 40.4418C13.6683 39.3491 13.1883 39.5821 11.5007 39.0215L8.29883 38.0232C7.88389 37.8815 7.60829 37.6579 7.37296 38.1146C7.09117 38.6562 7.64545 38.4925 8.72615 39.4246C9.55603 40.1395 10.8504 41.563 10.8504 43.0085Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M52.3225 17.4588C52.3225 19.4491 52.2668 19.7671 51.6011 21.5622C50.8641 23.5462 50.4801 25.5176 51.4772 27.5394C52.0005 28.6007 52.2606 28.755 53.394 29.0668C55.1621 29.5518 56.8064 30.1942 58.5652 30.6099C58.6055 30.1407 58.5621 30.3234 58.7138 30.0053C55.9703 28.1346 54.0009 26.2294 55.8371 22.5448C56.088 22.044 56.1003 22.044 56.4193 21.6252C56.6391 21.3323 56.9891 20.989 57.0881 20.7844C57.5186 19.8963 56.4472 17.0557 55.9424 16.0479L54.0721 13.4152C52.4495 11.7618 51.1366 11.4721 49.3499 10.5084C49.5047 11.0879 52.3225 13.3112 52.3225 17.4588Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.7957 50.7178C16.7957 52.7868 16.7616 53.7757 17.6875 55.555C19.5392 55.555 20.4682 54.9283 22.3416 55.6589C24.1036 56.3454 24.7786 57.9074 25.1564 59.5986C25.2524 60.03 25.2028 60.3449 25.2834 60.8299C25.4506 61.7936 27.5624 62.8234 28.3427 63.1603C29.0023 63.4438 29.9313 63.6075 30.4701 63.8689C30.4546 63.2107 29.9282 61.7117 29.7455 61.1291C28.5285 57.2587 28.4666 53.5615 24.5464 52.2073C21.9948 51.3256 19.5269 52.7679 18.3997 51.1996C18.0498 50.7146 17.4491 49.3352 17.3871 48.6015H17.093C17.031 49.3919 16.7957 49.7541 16.7957 50.7178Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M50.3903 44.8224C50.3903 47.1402 50.8146 48.1543 49.7617 49.0203C49.291 49.4077 47.8666 50.0501 47.1204 50.1131C47.8233 51.0894 52.2668 50.913 54.1062 49.6596C53.2639 45.9876 54.0164 42.6557 58.3082 42.1424C59.4168 42.0101 59.3208 42.2904 59.9463 41.5409C60.9713 40.3158 61.7702 38.4074 62.1356 36.8108C61.3862 36.8265 55.6204 38.6468 54.4964 39.0184C52.0718 39.8214 50.3903 42.0668 50.3903 44.8224Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.8908 18.6681C12.7516 22.4282 12.0704 25.6468 7.6454 26.2923C6.35104 26.4813 6.36652 26.2168 5.13719 28.2764C4.52717 29.2967 4.15558 30.3926 3.8645 31.6681L11.352 29.4542C12.7176 29.0511 13.5289 28.437 14.2968 27.4607C17.5389 23.3478 13.3276 20.271 17.5606 18.687C18.1179 18.4791 18.5762 18.4823 18.8797 18.0634C17.8269 17.9752 16.9505 17.5092 15.2877 17.7296C13.8292 17.9249 12.9281 18.1107 11.8908 18.6681Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M43.2559 16.5518C46.0613 16.5518 47.2969 15.7361 48.2196 18.4602C48.4054 19.0113 48.52 19.5908 48.9071 19.8774C49.0464 18.1579 49.545 16.8069 48.9411 14.4009C48.7089 13.475 48.4519 13.3081 48.3125 12.7727C46.2998 12.9428 41.7633 14.4198 40.8127 8.60944C40.6238 7.45053 40.983 7.61114 40.2584 6.90571C39.1127 5.78459 37.1464 4.99413 35.5269 4.60992C35.5454 5.40668 37.4281 11.3871 37.6975 12.2279C38.5336 14.8197 40.76 16.5518 43.2559 16.5518Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.5224 41.7551C28.9002 41.9031 28.6184 41.5409 28.7918 41.9629C27.9433 43.1344 27.3612 45.0019 26.5096 46.1829C26.8534 46.8316 29.4328 55.8667 29.7455 56.8965C30.0335 57.8445 32.7833 66.8607 32.8483 67.648L33.1456 67.1945L33.0929 54.3047C32.7647 54.0874 29.1046 42.0448 29.1851 41.6543L28.8537 41.4181C28.7485 41.6984 28.8321 41.6133 28.5224 41.7551Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32.7336 1.28434C33.0619 1.74413 32.9473 2.037 32.938 2.79282C32.9318 3.34708 32.9349 3.9045 32.9349 4.45876C32.9349 6.67582 33.0619 12.8011 32.873 14.2245C33.2663 14.4324 32.9535 13.7836 33.4985 15.585C33.6781 16.1802 33.8205 16.6463 33.9939 17.1974C34.669 19.3515 36.6198 25.3161 36.9016 26.8057L37.0131 26.919L37.3847 26.6892C37.1091 26.538 37.394 26.96 37.2051 26.4908C37.651 25.7538 38.0938 24.9004 38.4282 24.1887C38.7967 23.4014 39.1745 22.5794 39.7938 22.148H39.3912C39.1807 21.2347 38.871 20.397 38.6171 19.4585C37.7934 16.4258 33.2415 1.80711 33.1486 0.679688C32.6934 1.01665 33.003 0.626151 32.7336 1.28434Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.891764 34.5433C0.644039 34.1969 0.442763 34.2473 1.92292 34.2756L13.0767 34.3418C13.2161 33.9103 12.7702 34.4614 13.2594 34.1119C13.4019 34.008 13.5071 33.9796 13.6651 33.9261C13.919 33.841 14.1915 33.7844 14.4795 33.6962C16.7802 32.997 24.6052 30.4777 25.7014 30.3265C25.9398 30.0242 25.6673 30.654 25.9274 29.9675L25.785 29.9612C25.0666 29.8037 23.9828 29.1518 23.2334 28.7519C22.8154 28.5283 22.4717 28.3456 22.0629 28.1283C21.3972 27.7788 21.4808 27.8922 21.1123 27.3379V27.741C20.2731 27.9394 19.372 28.2858 18.4895 28.5503L2.69706 33.3529C2.0313 33.5608 0.721453 34.03 0.00305176 34.0898C0.321997 34.537 0.281742 34.3544 0.891764 34.5433Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M53.0687 34.1213C52.7312 34.4898 41.5774 37.9256 40.3202 38.0988C40.2025 38.2248 40.1375 38.1807 40.0663 38.483L40.2428 38.4736C41.5805 38.6971 43.4663 40.3725 44.8938 40.6812L44.7452 40.7441L64.7582 34.6441C65.3837 34.4614 65.6841 34.5307 65.9999 34.093C65.5076 34.052 65.5355 34.0079 65.1081 33.7906C64.7334 34.3134 65.3435 34.0426 64.3773 34.178L62.1354 34.1623C59.6179 34.1623 55.1806 34.2756 53.0687 34.1213Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M26.906 21.8456C26.5933 22.7117 27.4231 23.5242 27.7792 24.2926C28.0394 24.8531 28.606 26.2388 29.1324 26.5317L32.8762 14.2245C33.0682 12.8011 32.9381 6.67581 32.9381 4.45875C32.9381 3.90449 32.935 3.34708 32.9412 2.79281C32.9505 2.03385 33.0651 1.74412 32.7368 1.28433L27.1383 20.419C26.9494 21.0709 26.714 21.2693 26.906 21.8456Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40.4658 30.3108L53.0657 34.1213C55.1807 34.2788 59.6149 34.1654 62.1324 34.1654L64.3743 34.1812C65.3405 34.0457 64.7304 34.3166 65.1051 33.7938C64.5601 33.7906 60.9712 32.6569 60.2188 32.4113C58.6116 31.8885 56.8745 31.3657 55.1776 30.8871C54.4468 30.6792 53.5766 30.3926 52.787 30.1438L47.7458 28.6196C47.077 28.4307 45.9065 27.8008 45.1881 28.0465C44.3117 27.7662 43.4045 28.5629 42.6613 28.9629C42.1132 29.2526 40.695 29.8132 40.4658 30.3108Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.0959 54.3079L33.1486 67.1977C33.353 67.0119 33.8113 65.2199 33.9258 64.8105L36.239 57.0351C36.496 56.1029 39.2922 47.1938 39.1683 46.4852C39.2736 45.7798 38.5087 44.6271 38.1433 43.969C37.8151 43.3801 37.2825 42.0794 36.9047 41.8432L33.0959 54.3079Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.891836 34.5433L18.4152 39.8529C19.1058 40.0765 20.3413 40.6528 20.9606 40.4418C21.549 40.5269 22.7566 39.8151 23.3233 39.5097C23.7444 39.2798 24.0758 39.1003 24.4907 38.883C25.045 38.5901 25.2927 38.5492 25.5714 38.1272L13.0768 34.3449L1.92299 34.2788C0.442836 34.2473 0.644112 34.1969 0.891836 34.5433Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40.3203 38.0988C41.5775 37.9224 52.7313 34.4898 53.0688 34.1213L40.4689 30.3108L40.3141 30.3139C40.7879 31.7405 41.2214 32.3735 41.2183 34.241C41.2121 35.9731 40.8188 36.7509 40.3203 38.0988Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.0768 34.3418L25.5714 38.124L25.6922 38.1082C25.2153 36.7226 24.7942 36.0172 24.7911 34.2441C24.788 32.3893 25.2401 31.7342 25.7015 30.3265C24.6084 30.4777 16.7803 32.9971 14.4796 33.6962C14.1916 33.7844 13.9191 33.841 13.6652 33.9261C13.5103 33.9765 13.402 34.008 13.2595 34.1119C12.7703 34.4614 13.2162 33.9103 13.0768 34.3418Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.1294 26.5317L29.0984 26.812C30.464 26.3679 31.2195 25.8672 33 25.8672C34.8859 25.8641 35.4804 26.3459 36.9048 26.8088C36.6199 25.3224 34.6722 19.3578 33.9971 17.2005C33.8237 16.6494 33.6813 16.1802 33.5017 15.5881C32.9567 13.7868 33.2694 14.4355 32.8762 14.2277L29.1294 26.5317Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.0961 54.3079L36.9048 41.8432L36.815 41.6606C33.5791 42.8006 32.486 43.0021 29.1882 41.6574C29.1077 42.0479 32.7678 54.0906 33.0961 54.3079Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.2946 20.6364L19.2296 20.3624C19.7931 21.1119 21.0441 22.2677 21.7502 23.0077C22.4902 23.7793 23.5121 25.102 24.3853 25.6184C25.0697 25.6342 28.4294 26.6136 28.9868 26.9285L29.0952 26.8151L29.1262 26.5349C28.6028 26.2388 28.0331 24.8563 27.773 24.2958C27.42 23.5273 26.587 22.7148 26.8997 21.8488C26.5312 22.0063 26.6025 21.5969 26.6025 22.1511C25.7726 22.0818 19.8953 20.0537 19.0221 20.0349C19.0283 21.0835 18.9787 20.3561 19.2946 20.6364Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M36.8149 41.6606L36.9047 41.8432C37.2825 42.0794 37.8182 43.3769 38.1434 43.9689C38.5088 44.6303 39.2736 45.7829 39.1683 46.4852C39.447 46.3277 39.3913 46.7371 39.3913 46.1829C39.9332 46.4474 40.6082 46.586 41.1935 46.7686C41.8685 46.9796 42.4259 47.1213 43.1598 47.3386C43.841 47.5402 44.3241 47.7008 44.9868 47.8992C45.5751 48.0755 46.4514 48.4062 46.9716 48.4503C46.9716 47.3008 47.0057 47.9622 46.6744 47.6945L46.086 47.3859C45.1137 46.586 42.494 43.6981 41.6084 42.7376C41.274 42.914 40.7909 42.6935 40.4162 42.5707C39.862 42.3912 37.3445 41.9062 37.1494 41.4275L36.8149 41.6606Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.9606 40.4387C21.1959 41.2606 20.3506 43.4619 20.0873 44.3878C19.8923 45.0743 19.6724 45.7609 19.5052 46.3655C19.3225 47.0332 19.0438 47.7197 19.0283 48.4503C19.5331 48.4062 19.6105 48.4094 19.9201 48.0346C19.3566 48.1795 19.7219 48.2047 19.3999 47.9307L23.8961 43.5753C24.0169 43.4525 24.0881 43.3927 24.1934 43.2698C24.2151 43.2478 24.246 43.2069 24.2646 43.1848L24.3947 43.0022C24.4039 42.9486 24.438 42.9392 24.4566 42.9045C24.4814 42.1834 25.528 38.7664 25.9429 38.4673C25.8655 38.1744 25.8036 38.2216 25.6921 38.1051L25.5713 38.1208C25.2927 38.5428 25.0449 38.5838 24.4906 38.8767C24.0757 39.094 23.7475 39.2766 23.3232 39.5034C22.7535 39.8151 21.5458 40.5237 20.9606 40.4387Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M41.1904 25.6279C41.946 25.4673 41.3948 25.5302 41.6054 25.8326C41.0418 26.8277 40.7662 29.2747 40.0602 29.9455L40.3079 30.3108L40.4627 30.3076C40.6919 29.81 42.1101 29.2495 42.6582 28.9566C43.4014 28.5566 44.3056 27.7599 45.185 28.0402C45.0302 27.6654 45.4327 27.7378 44.8877 27.7378C44.9527 26.9316 46.9469 21.0237 46.9686 20.0285C45.922 20.0285 46.6558 19.9687 46.3741 20.3246L46.6651 20.312C45.8291 20.9859 44.7979 22.2141 43.999 23.0549C42.9369 24.1792 42.3671 24.9886 41.1904 25.6279Z"
              fill="#E57817"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M39.797 22.148C39.1777 22.5763 38.7968 23.4014 38.4314 24.1887C38.097 24.9035 37.6542 25.757 37.2083 26.4908C37.3971 26.9631 37.1092 26.538 37.3879 26.6892L41.1935 25.6279C42.3702 24.9886 42.9369 24.1761 44.0052 23.055C44.8041 22.2141 45.8353 20.9859 46.6713 20.312L46.3802 20.3246C45.8755 20.1608 45.2531 20.4568 44.7267 20.6143C44.1631 20.7844 43.6553 20.9292 43.1103 21.0867C42.2711 21.326 40.4503 21.7543 39.797 22.148Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.4535 42.9077C24.4349 42.9423 24.4009 42.9518 24.3916 43.0053L24.2615 43.188C24.243 43.21 24.212 43.2478 24.1903 43.273C24.085 43.3927 24.0138 43.4557 23.8931 43.5785L19.3969 47.9339C19.7189 48.2078 19.3535 48.1826 19.9171 48.0378C20.5085 48.1795 22.5987 47.4394 23.3171 47.2253C23.8838 47.0584 26.1876 46.4348 26.5096 46.186C27.3581 45.0051 27.9433 43.1407 28.7918 41.9661C28.6153 41.5409 28.9002 41.9031 28.5224 41.7582L24.4535 42.9077Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M41.6115 42.7376C42.5002 43.6981 45.1168 46.586 46.0891 47.3859L46.6774 47.6945C46.8632 47.1308 45.1385 41.3047 44.7452 40.741L44.8938 40.678C43.4663 40.3694 41.5805 38.694 40.2428 38.4704L41.6115 42.7376Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.75635 21.6945C4.75635 24.9035 10.1072 25.2909 10.1072 21.5433C10.1072 17.9689 4.75635 17.8745 4.75635 21.6945Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M55.8928 46.9387C55.8928 50.4595 61.2437 50.4186 61.2437 46.9387C61.2437 43.3454 55.8928 43.2635 55.8928 46.9387Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M42.8099 8.08666C42.8099 12.1177 48.1608 11.5949 48.1608 8.23783C48.1608 7.59223 47.7273 6.67581 47.3743 6.3168C45.7114 4.63511 42.8099 5.84126 42.8099 8.08666Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.1093 6.72619C21.1093 10.7446 26.4291 10.2817 26.4291 6.87735C26.4291 3.39746 21.1093 3.30928 21.1093 6.72619Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M44.8907 61.907V61.1511C44.8907 58.8207 40.8838 57.7563 39.7938 60.5024C38.6078 63.4879 42.4723 65.4624 44.2621 63.3808C44.4913 63.1163 44.8907 62.3541 44.8907 61.907Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.41858 43.4619C3.41858 46.164 6.3634 47.1969 7.99529 45.5467C10.3115 43.2068 7.07252 39.179 4.31968 41.6574C3.81184 42.1172 3.41858 42.9958 3.41858 43.4619Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.8362 60.2442C17.8362 61.1952 18.6165 62.2975 19.465 62.6691C21.4189 63.5225 23.187 62.0928 23.187 60.093C23.187 57.6366 20.0781 56.6667 18.536 58.3861C18.1985 58.7577 17.8362 59.6017 17.8362 60.2442Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.2947 20.6363C19.1491 21.2252 19.4402 21.8078 19.6043 22.318C19.7808 22.8754 19.9202 23.4139 20.0688 23.9619C20.3042 24.8153 20.7284 26.6576 21.1093 27.3379C21.4746 27.8921 21.3941 27.7788 22.0599 28.1283C22.4686 28.3425 22.8093 28.5283 23.2304 28.7519C23.9798 29.1518 25.0636 29.8037 25.782 29.9612L24.3916 25.6153C23.5153 25.1019 22.4934 23.7761 21.7564 23.0045C21.0473 22.2645 19.7963 21.1087 19.2358 20.3592L19.2947 20.6363Z"
              fill="#FDF300"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M57.2306 24.7178C57.2306 26.1632 58.3299 27.4387 59.4601 27.4387H60.3519C61.4419 27.4387 62.5814 25.9869 62.5814 24.8689C62.5814 23.625 61.5131 22.148 60.3519 22.148H59.4601C58.3206 22.148 57.2306 23.4959 57.2306 24.7178Z"
              fill="#0091DE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M31.4362 26.3301C36.0501 25.2625 40.023 28.8054 40.7661 32.5373C41.627 36.858 38.7781 41.2701 34.6411 42.1078C31.4176 42.7597 28.0672 41.2386 26.4105 38.6751C24.568 35.8219 24.6733 31.9798 26.5963 29.5392C27.3704 28.5598 27.4819 28.3079 28.6214 27.5205C29.4018 26.9852 30.3338 26.5852 31.4362 26.3301ZM29.0983 26.8088L28.9899 26.9222C27.7575 27.5867 26.6396 28.7487 25.9212 29.9643C25.6611 30.6509 25.9336 30.0179 25.6952 30.3234C25.2338 31.7311 24.7817 32.3861 24.7848 34.241C24.7879 36.0172 25.209 36.7226 25.6859 38.1051C25.8005 38.2216 25.8593 38.1744 25.9367 38.4673C26.9276 40.0702 27.3023 40.4009 28.8537 41.4181L29.185 41.6543C32.4828 42.999 33.5759 42.7943 36.8118 41.6574L37.1463 41.4244C38.6326 40.4418 39.1188 40.0104 40.0601 38.4799C40.1344 38.1775 40.1995 38.2216 40.314 38.0956C40.8126 36.7478 41.2058 35.9699 41.2089 34.2378C41.212 32.3672 40.7785 31.7374 40.3047 30.3108L40.057 29.9454C39.4594 28.796 38.165 27.5457 37.01 26.9159L36.8985 26.8025C35.4741 26.3396 34.8827 25.8609 32.9938 25.8609C31.2195 25.8672 30.4639 26.3679 29.0983 26.8088Z"
              fill="#DCD507"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.4535 42.9077L28.5224 41.755C28.832 41.6133 28.7484 41.6984 28.8568 41.4212C27.3054 40.404 26.9307 40.0734 25.9398 38.4704C25.5249 38.7664 24.4783 42.1865 24.4535 42.9077Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M37.3878 26.6891L37.0162 26.919C38.1713 27.5457 39.4656 28.7991 40.0632 29.9486C40.7693 29.2778 41.0418 26.8309 41.6084 25.8357C41.3979 25.5334 41.949 25.4704 41.1935 25.631L37.3878 26.6891Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M37.1494 41.4244C37.3445 41.9062 39.8651 42.388 40.4163 42.5675C40.7941 42.6904 41.274 42.9108 41.6085 42.7344L40.2398 38.4704L40.0633 38.4798C39.1219 40.0135 38.6358 40.445 37.1494 41.4244Z"
              fill="#FEFEFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.7788 29.9612L25.9212 29.9675C26.6396 28.7519 27.7575 27.5898 28.9899 26.9253C28.4325 26.6104 25.0728 25.631 24.3884 25.6153L25.7788 29.9612Z"
              fill="#FEFEFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_3_874">
              <rect
                width="66"
                height="86.3203"
                fill="white"
                transform="translate(0 0.679688)"
              />
            </clipPath>
          </defs>
        </svg>

        <h2 style={{ paddingBottom: "10px", marginTop: "10px" }}>
          {" "}
          FÖVQƏLADƏ HALLAR KÖNÜLLÜLƏRİ
        </h2>

        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "left",
            justifyContent: "center",
            width: 500,
          }}
        >
          <input
            style={{
              border: "1px solid grey",
              borderRadius: "9px",
              padding: "2%",
              marginBottom: "2%",
              display: "block",
            }}
            type="email"
            placeholder="İstifadəçi adınızı daxil edin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
              border: "1px solid grey",
              borderRadius: "9px",
              padding: "2%",
              marginBottom: "1%",
              display: "block",
            }}
            type="password"
            placeholder="Şifrənizi daxil edin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              padding: "12px ",
              border: "1px solid grey",
              borderRadius: "9px",
              color: " white",
              backgroundColor: "#4b7d83",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            Daxil ol
          </button>
        </div>
        {error && (
          <div
            className="modal"
            style={{
              backgroundColor: "white",
              color: "red",
              marginTop: "20px",
              padding: "3%",
              borderRadius: "9px",
            }}
          >
            <div className="modal-content">
              <p>{error}</p>
            </div>
            <span className="close" onClick={() => setError(null)}>
              &times;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default Login;
