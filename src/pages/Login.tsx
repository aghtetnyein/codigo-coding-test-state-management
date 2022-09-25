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
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center p-2">
      <div className="w-80">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            register={register("username")}
            required={true}
            type={"text"}
            disabled={false}
            name={"username"}
            label={"Username"}
            placeholder={"Username"}
            error={errors.username?.message?.toString()}
          />
          <Button
            variant={"primary"}
            type={"submit"}
            disabled={false}
            label={"Log in"}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
