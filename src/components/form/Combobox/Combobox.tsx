import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import "./assets/Combobox.scss";
import {
  IComboboxItemProps,
  ICombobxProps,
  IComboboxItem,
  ISelectedItemProps,
} from "./meta/types";
import classNames from "classnames";
import InputCore from "../InputCore/InputCore";
import CheckboxCore from "../CheckboxCore/CheckboxCore";
import Loading from "components/Loading/Loading";

const renderSelectedItem = ({
  value,
  placeholder,
}: ISelectedItemProps = {}) => {
  if (value) {
    if (Array.isArray(value))
      if (value.length === 0) return "";
      else if (value.length > 2) return `${value.length} انتخاب شده`;
      else return value.map(item => item.label).join(" , ");
    else if (typeof value === "object") return value.label;
    return value;
  }
  return "";
};

const ComoboboxItem: (props: IComboboxItemProps) => any =
  memo<IComboboxItemProps>(
    ({
      multiSelect,
      id,
      label,
      onMouseEnterItem,
      onMouseLeaveItem,
      className,
      onItemClick,
      onCheckboxChange,
      hover,
      marketCheckbox,
      value,
      itemsObject,
      group,
      subtitle,
      ...rest
    }: IComboboxItemProps) => {
      const item: IComboboxItem = { id, label };
      const hovered = hover === id;
      if (group) return <div className="group">{label}</div>;
      if (multiSelect) {
        const selected = (Array.isArray(value) ? value : []).some(
          item => item.id === id
        );
        return (
          <div
            className={classnames(className, "item d-flex align-items-center", {
              hovered,
              selected,
            })}
            onMouseOver={() => onMouseEnterItem(item.id)}
            onMouseOut={onMouseLeaveItem}
            onClick={onItemClick({ id, label, ...rest })}>
            <CheckboxCore
              className="mr-2"
              marketCheckBox={marketCheckbox}
              onChange={(checked: boolean) => onCheckboxChange(checked, item)}
              value={itemsObject[id]}
            />
            <div className="title">{label}</div>
            {subtitle && <div className="subtitle">
              {subtitle}
            </div>}
          </div>
        );
      } else {
        const selecetd = !Array.isArray(value) ? value?.id === id : false;
        return (
          <div
            data-testid={id}
            className={classnames(className, "item", {
              hovered,
              selected: selecetd,
            })}
            onMouseOver={() => onMouseEnterItem(item.id)}
            onMouseOut={onMouseLeaveItem}
            onClick={onItemClick({ id, label, ...rest })}>
            <div className="title">
              {label}
            </div>
            {subtitle && <div className="subtitle">
              {subtitle}
            </div>}
          </div>
        );
      }
    }
  );

function Combobox({
  items = [],
  onChange: onChangeInput,
  onBlur,
  hasInput = false,
  disabled = false,
  onInputChange,
  onInputFocus,
  className,
  marketCheckbox,
  label,
  loading = false,
  multiSelect = false,
  value = multiSelect ? [] : undefined,
  placeholder = "",
  icon,
  hasSearch,
  onOpenStateChange,
}: ICombobxProps) {
  // const [isOpen, setOpen] = useState(false)
  // const [hover, setHover] = useState(null)
  // const [inputValue, setInputValue] = useState<string>('')
  const [comboState, setComboState] = useState<{
    isOpen: boolean;
    inputValue: string;
    hover?: any;
  }>({
    inputValue: !Array.isArray(value) ? value?.label ?? "" : "",
    isOpen: false,
  });

  const isFirst = useRef<boolean>(true);
  const previusValue = useRef<any>(value);

  const inputValue = comboState.inputValue;
  const hover = comboState.hover;
  const isOpen = comboState.isOpen;

  const setInputValue = useCallback((v: string) => {
    setComboState(prevState => ({
      ...prevState,
      inputValue: v,
    }));
  }, []);

  const setHover = useCallback((v: any) => {
    setComboState(prevState => ({
      ...prevState,
      hover: v,
    }));
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!value) {
      setComboState(prev => ({
        ...prev,
        inputValue: '',
        isOpen: false
      }))
      previusValue.current = value;
    } else {
      if (previusValue.current !== value) {
        if (!Array.isArray(value)) {
          setInputValue(value?.label ?? '')
        }
        previusValue.current = value;
      }
    }
  }, [setInputValue, value])

  const setOpen = useCallback(
    (v: boolean | ((prevState: boolean) => boolean)) => {
      if (typeof v === "function") {
        setComboState(prevState => ({
          ...prevState,
          isOpen: v(prevState.isOpen),
        }));
      } else {
        setComboState(prevState => ({
          ...prevState,
          isOpen: v,
        }));
      }
    },
    []
  );

  const textRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickEvent = (event: any) => {
      if (ref && ref.current) {
        if (!ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", clickEvent);
    return () => {
      document.removeEventListener("mousedown", clickEvent);
    };
  }, [ref, setOpen]);
  const toggleCombobox = useCallback(() => {
    if (!disabled) {
      setOpen(s => {
        if (!s === false) textRef.current?.blur();
        onOpenStateChange && onOpenStateChange(!s);
        return !s;
      });
      onBlur && onBlur();
    }
  }, [disabled, onBlur, onOpenStateChange, setOpen]);
  const onChange = useCallback(
    (item: IComboboxItem | IComboboxItem[]) => {
      if (!disabled) {
        onChangeInput && onChangeInput(item);
        onBlur && onBlur();
        setComboState(prevState => ({
          ...prevState,
          isOpen: !multiSelect ? false : true,
          inputValue:
            hasInput && !Array.isArray(item)
              ? item.label || ""
              : prevState.inputValue,
        }));
      }
    },
    [disabled, onChangeInput, onBlur, multiSelect, hasInput]
  );

  const onMouseEnterItem = useCallback(
    id => {
      setHover(id);
    },
    [setHover]
  );

  const onMouseLeaveItem = useCallback(() => {
    setHover(null);
  }, [setHover]);

  const onInputBlur = useCallback(() => {
    if (value && !Array.isArray(value) && value.label) {
      setInputValue(value.label);
    }
  }, [setInputValue, value]);

  const itemsObject = useMemo(() => {
    if (multiSelect)
      return (value || []).reduce(
        (total: any, item: any) => ({
          ...total,
          [item.id]: item,
        }),
        {}
      );
    return {};
  }, [multiSelect, value]);

  const onCheckboxChange = useCallback(
    (checked, item) => {
      if (checked) {
        onChange((value || []).concat(item));
      } else {
        if (Array.isArray(value)) {
          const valueCopy = [...value];
          const index = valueCopy.findIndex(
            arrayItem => arrayItem.id === item.id
          );
          valueCopy.splice(index, 1);
          onChange(valueCopy);
        }
      }
    },
    [onChange, value]
  );

  const onItemClick = useCallback(
    item => () => {
      if (multiSelect) {
        if (itemsObject[item.id]) {
          onCheckboxChange(false, item);
        } else {
          onCheckboxChange(true, item);
        }
      } else {
        onChange(item);
      }
    },
    [itemsObject, multiSelect, onChange, onCheckboxChange]
  );

  return (
    <div className={classnames("combobox w-100", className)} ref={ref}>
      <div
        className={classnames("combobox-field", { disabled })}
        onClick={toggleCombobox}>
        {!hasInput && (
          <InputCore
            readonly={true}
            className={classNames({ focused: isOpen })}
            ref={textRef}
            placeholder={placeholder}
            label={label}
            icon={icon ? icon : <i className="online-icon-angel-down"></i>}
            value={renderSelectedItem({ value, placeholder })}
          />
        )}
        {hasInput && (
          <InputCore
            ref={textRef}
            className={classNames({ focused: isOpen, "has-input": hasInput })}
            value={inputValue}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

              onInputChange && onInputChange(e.target.value, !isOpen);
              setInputValue(e.target.value);
              if (!isOpen) {
                toggleCombobox();
              }

            }}
            disabled={disabled}
            icon={icon ? icon : <i className="online-icon-angel-down"></i>}
            onFocus={e => {
              onInputFocus && onInputFocus(e.target.value);
            }}
            onBlur={onInputBlur}
          />
        )}
      </div>
      <div
        className={classnames("items", {
          "is-loading": loading,
          "is-close": !isOpen,
        })}
        style={{ backgroundColor: "white", zIndex: 10 }}>
        {loading && <Loading size={15} className="z-2" />}
        {items.map((item, index) => (
          <ComoboboxItem
            multiSelect={multiSelect}
            key={index}
            className={className}
            marketCheckbox={marketCheckbox}
            hover={hover}
            onCheckboxChange={onCheckboxChange}
            onItemClick={onItemClick}
            onMouseEnterItem={onMouseEnterItem}
            onMouseLeaveItem={onMouseLeaveItem}
            itemsObject={itemsObject}
            {...item}
            id={item.id}
            label={item.label}
            subtitle={item.subtitle}
            group={item.group}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}

export default Combobox;
