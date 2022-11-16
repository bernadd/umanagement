import React from "react";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { MoonLoader } from "react-spinners";
import { FormGroup, FormLabel, FormWrapper } from "@/components/Form";
import { InputField } from "@/components/Form/InputField";
import { Select } from "@/components/Form/Select";
import { Button } from "@/components/Button";
import { usePermissions } from "@/hooks/usePermissions";
import {
  useCreatePermissionUser,
  useDeletePermissionUser,
} from "@/hooks/usePermissionsUsers";
import { IUser, UserStatus } from "@/types/user.types";

interface StatusOptionType {
  value: UserStatus;
  label: UserStatus;
}

interface UserFormProps {
  isCreateForm?: boolean;
  user: IUser;
  isLoading?: boolean;
  onSubmitForm: (data: IUser) => void;
}

export default function UserForm({
  isCreateForm = false,
  user,
  isLoading = false,
  onSubmitForm,
}: UserFormProps) {
  const { data } = usePermissions(1, 10);
  const createPermissionUser = useCreatePermissionUser();
  const deletePermissionUser = useDeletePermissionUser();

  const { register, handleSubmit, setValue, control } = useForm<IUser>({
    defaultValues: user || {},
  });

  const onSubmit = (data: IUser) => {
    onSubmitForm(data);
  };

  const statusOptions: StatusOptionType[] = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormLabel
          htmlFor="firstName"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          First name
        </FormLabel>
        <InputField
          type="text"
          {...register("firstName")}
          placeholder="First Name"
          id="firstName"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          htmlFor="lastName"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          Last name
        </FormLabel>
        <InputField
          type="text"
          {...register("lastName")}
          placeholder="Last Name"
          id="lastName"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          htmlFor="username"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          Username
        </FormLabel>
        <InputField
          type="text"
          {...register("username")}
          placeholder="Username"
          id="username"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          htmlFor="username"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          Password
        </FormLabel>
        <InputField
          type="password"
          {...register("password")}
          placeholder="Password"
          id="username"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          htmlFor="email"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          Email address
        </FormLabel>
        <InputField
          type="text"
          {...register("email")}
          placeholder="Email address"
          id="email"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel
          htmlFor="email"
          style={{ flex: "0 0 140px", marginRight: 14 }}
        >
          Status
        </FormLabel>
        <Select {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>
      </FormGroup>
      {isCreateForm && (
        <FormGroup>
          <FormLabel style={{ flex: "0 0 140px", marginRight: 14 }}>
            Permissions
          </FormLabel>
          <div>
            {data!.permissions.map((permission) => {
              return (
                <div
                  key={permission.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    id={permission.name}
                    disabled={
                      createPermissionUser.isLoading ||
                      deletePermissionUser.isLoading
                    }
                    defaultChecked={
                      user?.permissions
                        ? user.permissions.some(
                            (item) => item.permissionId === permission.id
                          )
                        : false
                    }
                    onClick={(e) => {
                      if (user && user.id && permission && permission.id) {
                        if (e.currentTarget.checked) {
                          createPermissionUser.mutate({
                            userId: user.id,
                            permissionId: permission.id,
                          });
                        } else {
                          deletePermissionUser.mutate({
                            userId: user.id,
                            permissionId: permission.id,
                          });
                        }
                      }
                    }}
                    style={{ width: 16, height: 16 }}
                  />
                  <label htmlFor={permission.name} style={{ marginLeft: 10 }}>
                    {permission.name}
                  </label>
                </div>
              );
            })}
          </div>
        </FormGroup>
      )}
      <FormGroup>
        <FormLabel style={{ flex: "0 0 140px", marginRight: 14 }}>
          Created at
        </FormLabel>
        <div>
          {user && format(parseISO(user.createdAt), "MMM d YYY '@' h:m a")}
        </div>
      </FormGroup>
      <FormGroup>
        <FormLabel style={{ flex: "0 0 140px", marginRight: 14 }}>
          Updated at
        </FormLabel>
        <div>
          {user && format(parseISO(user.updatedAt), "MMM d YYY '@' h:m a")}
        </div>
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
