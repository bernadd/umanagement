import React from "react";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { FormGroup, FormLabel, FormWrapper } from "@/components/Form";
import { InputField } from "@/components/Form/InputField";
import { Button } from "@/components/Button";
import { IPermission } from "@/types/permission.type";

interface PermissionFormProps {
  permission?: IPermission;
  isCreating?: boolean;
  isLoading?: boolean;
  onSubmitForm: (data: IPermission) => void;
}

export default function PermissionForm({
  permission,
  isCreating = false,
  isLoading = false,
  onSubmitForm,
}: PermissionFormProps) {
  const { register, handleSubmit } = useForm<IPermission>({
    defaultValues: permission || {},
  });

  const onSubmit = (data: IPermission) =>
    onSubmitForm({
      ...data,
      ...(!isCreating && { updatedAt: new Date().toISOString() }),
    });

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormLabel
          htmlFor="name"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          Permission name
        </FormLabel>
        <InputField
          type="text"
          {...register("name")}
          placeholder="Permission name"
          id="name"
        />
      </FormGroup>
      <FormGroup style={{ paddingLeft: 154, marginTop: 20 }}>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading && <MoonLoader size={10} />}
          <div style={{ marginLeft: isLoading ? 10 : 0 }}>Submit</div>
        </Button>
      </FormGroup>
    </FormWrapper>
  );
}
