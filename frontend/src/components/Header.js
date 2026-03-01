import { useGlobalContext } from '../context/GlobalContext';
// Removed unused icons

const Header = () => {
    const { t } = useGlobalContext();

    return (
        <header className="header" style={{ justifyContent: 'space-between', padding: '0 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h1 style={{ textShadow: '0 0 10px #00ff7f' }}>🌱 {t('appTitle')}</h1>
            </div>

            {/* Toggles removed */}
        </header>
    );
};

export default Header;
