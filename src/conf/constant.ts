export const userType = {
    keyMap: {
        user: 0,
        admin: 1
    },
    nameMap: {
        0: '普通用户',
        1: '管理员'
    }
};

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const particles = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#b8d2f6'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 1,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 1,
                sync: false
            }
        },
        size: {
            value: 8,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 250,
            color: '#b8d2f6',
            opacity: 1,
            width: 2
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: false,
                mode: 'repulse'
            },
            onclick: {
                enable: false,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 200,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true,
    config_demo: {
        hide_card: false,
        background_color: '#b61924',
        background_image: '',
        background_position: '50% 50%',
        background_repeat: 'no-repeat',
        background_size: 'cover'
    }
};

export const dbType = {
    dbType: [
        { enName: 'int', cnName: '整数' },
        { enName: 'decimal', cnName: '小数' },
        { enName: 'varchar', cnName: '字符串' },
        { enName: 'text', cnName: '文本' },
        { enName: 'bool', cnName: '布尔' },
        { enName: 'time', cnName: '时间' },
        { enName: 'date', cnName: '日期' },
        { enName: 'datetime', cnName: '日期时间' }
    ]
};

export const timeFormat = {
    dateMinute: 'YYYY-MM-DD HH:mm',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD',
    dateYear: 'YYYY',
    dateMonth: 'YYYY-MM',
    dateWeek: 'dddd',
    time: 'HH:mm:ss',
    dateTimeNoSeparator: 'YYYYMMDDHHmmss',
    dateNoSeparator: 'YYYYMMDD'
};

export const prefix = '/api';

export const mockPrefix = '/mock/20';
