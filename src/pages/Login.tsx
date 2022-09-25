// redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../redux/features/authSlice";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// components
import { InputText, Button } from "../components/forms";

// schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

const Login = () => {
  // redux - dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // hook-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);

    // dispatch auth success
    dispatch(
      login({
        user: {
          username: data.username,
        },
      })
    );

    navigate("/");
  };

  return (
    <div>
      This is Login Page
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          register={register("username")}
          required={true}
          type={"text"}
          disabled={false}
          name={"username"}
          label={"Username"}
          placeholder={"Username"}
          error={errors.username?.message}
        />
        <Button
          variant={"primary"}
          type={"submit"}
          disabled={false}
          label={"Log in"}
        />
      </form>
    </div>
  );
};

export default Login;
