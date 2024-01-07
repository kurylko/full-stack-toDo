const ProgressBar = ({progress}) => {
    const colors = [
        'rgba(255, 78, 47, 0.80)',
        'rgba(173, 255, 47, 0.61)',
        'rgba(0, 225, 255, 0.8)',
        'rgba(255,109,47,0.98)'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className='outer-bar'>
            <div className='inner-bar'
                 style={{
                     width: `${progress}%`,
                     backgroundColor: randomColor,
                 }}
            ></div>
        </div>
    );
}

export default ProgressBar;