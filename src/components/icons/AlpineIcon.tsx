type AlpineIconProps = {
    size?: number | string;
};

function AlpineIcon({ size = 24 }: AlpineIconProps) {
    return (
        <svg
            viewBox="0 0 45.116 22.806"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g opacity=".8">
                <path d="M33.71 0L11.207 22.693l.113.113h22.586l11.21-11.304z" fill="#d8dee9" />
                <path d="M11.405 0l22.578 22.769-.039.037H11.209L0 11.502z" fill="#8ac0cf" />
            </g>
        </svg>
    );
}

export { AlpineIcon };