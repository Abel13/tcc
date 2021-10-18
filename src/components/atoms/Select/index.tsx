import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import {
  Container,
  CustomOption,
  CustomSelect,
  Error,
  ItemsGroup,
} from "./styles";
import Colors from "../../../styles/colors.json";
import { SelectProps } from "./interfaces";

const Select: React.FC<SelectProps> = ({
  placeholder,
  name,
  groups,
  disabled,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container gotError={!!error} isFilled={isFilled} isFocused={isFocused}>
      <CustomSelect
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        defaultValue={defaultValue}
        disabled={disabled}
        ref={selectRef}
        {...rest}
      >
        <CustomOption value="">{placeholder}</CustomOption>
        {groups.length > 0 &&
          groups.map((group) => {
            return (
              <ItemsGroup
                groupColor={group.groupColor}
                label={group.groupName ?? placeholder}
              >
                {group.items.length > 0 &&
                  group.items.map((item) => {
                    return (
                      <CustomOption key={item.id} value={item.id}>
                        {item.value}
                      </CustomOption>
                    );
                  })}
              </ItemsGroup>
            );
          })}
      </CustomSelect>

      {error && (
        <Error title={error}>
          <FiAlertCircle color={Colors.danger} size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
