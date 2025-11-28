function Button({ lable, click, type }) {
    return (
        <div>

            <button
                type={type}
                onClick={click}
                className="bg-gradient-to-r from-green-700 to-primary hover:shadow-xl duration-200 text-white rounded-xl py-2 px-8">{lable}</button>

        </div>
    )
}

export default Button