import React from 'react'
import warning from 'warning'

export function useControlledSwitchWarning(propValue, propName, componentName) {
  const isControlled = propValue != null
  const {current: wasControlled} = React.useRef(isControlled)
  React.useEffect(() => {
    const warningOnControlledToUncontrolled = `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${propName}\` prop.`
    const warningOnUncontrolledToControlled = `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${propName}\` prop.`
    const controlledToUncontrolled = wasControlled && !isControlled
    const uncontrolledToControlled = !wasControlled && isControlled
    warning(!controlledToUncontrolled, warningOnControlledToUncontrolled)
    warning(!uncontrolledToControlled, warningOnUncontrolledToControlled)
  }, [componentName, isControlled, propName, wasControlled])
}

export function useOnChangeReadOnlyWarning(
  controlPropValue,
  controlPropName,
  componentName,
  hasOnChange,
  readOnly,
  readOnlyProp,
  initialValueProp,
  onChangeProp,
) {
  const isControlled = controlPropValue != null
  React.useEffect(() => {
    warning(
      !(!hasOnChange && isControlled && !readOnly),
      `A \`${controlPropName}\` prop was provided to \`${componentName}\` without an \`${onChangeProp}\` handler. This will result in a read-only \`${controlPropName}\` value. If you want it to be mutable, use \`${initialValueProp}\`. Otherwise, set either \`${onChangeProp}\` or \`${readOnlyProp}\`.`,
    )
  }, [
    componentName,
    controlPropName,
    isControlled,
    hasOnChange,
    readOnly,
    onChangeProp,
    initialValueProp,
    readOnlyProp,
  ])
}
