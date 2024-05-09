import './styles/Header.css';
const Header = (props) => {
    const { title } = props;
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
};

export default Header;
