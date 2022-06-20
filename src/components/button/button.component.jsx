import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    alert(buttonType)
    return (
       <button className={`buton-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
       {...otherProps}
       >
        {children}
       </button>
    )
}


export default Button