const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');

const blockIconURI = 'data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPy0tPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Il94MzJfIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJ3aWR0aDogMjU2cHg7IGhlaWdodDogMjU2cHg7IG9wYWNpdHk6IDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNEI0QjRCO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjUwLjg4MiwzNi44MjhjMTAuMTcxLDAuMDE2LDE4LjQzLTguMjI3LDE4LjQzOC0xOC4zOUMyNjkuMzI4LDguMjYsMjYxLjA5MywwLjAwOCwyNTAuOTIzLDAKCQljLTEwLjE3MS0wLjAwOC0xOC40MjIsOC4yMjctMTguNDMsMTguMzk3QzIzMi40NzcsMjguNTY4LDI0MC43MTEsMzYuODE5LDI1MC44ODIsMzYuODI4eiIgc3R5bGU9ImZpbGw6IHJnYig3NSwgNzUsIDc1KTsiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjAuMzQ0LDk5LjI1OGMwLjAwOC01Ljk3OS00LjgzNC0xMC44MzgtMTAuODEzLTEwLjgzOGMtNS45NzgsMC0xMC44MzcsNC44NDItMTAuODQ2LDEwLjgyMQoJCWMtMC4wMDgsNS45ODgsNC44NDIsMTAuODM4LDEwLjgzLDEwLjgzOEMyNTUuNDk0LDExMC4wODcsMjYwLjM0NCwxMDUuMjQ0LDI2MC4zNDQsOTkuMjU4eiIgc3R5bGU9ImZpbGw6IHJnYig3NSwgNzUsIDc1KTsiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjIuNDAzLDYwLjQ0NWMtMC4wMDgsNy4xNTcsNS43ODksMTIuOTU0LDEyLjk0NiwxMi45N2M3LjE0OCwwLDEyLjk0NS01Ljc4LDEyLjk1NC0xMi45NDUKCQljMC4wMDgtNy4xNDgtNS43ODEtMTIuOTQ2LTEyLjkyOS0xMi45NDZDMjY4LjIxNyw0Ny41MDgsMjYyLjQxMSw1My4yOTcsMjYyLjQwMyw2MC40NDV6IiBzdHlsZT0iZmlsbDogcmdiKDc1LCA3NSwgNzUpOyI+PC9wYXRoPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQzMy45NDgsNDM4LjMxMkwzMzAuMjc2LDI3Mi43M2MtOS40MzctMTUuMDc4LTE0LjQzNi0zMi41MDQtMTQuNDM2LTUwLjI4NGwwLjEzMS0xMDcuNTkxaC0xOC4zNDcKCQlsLTAuMTI0LDEwNy4yN3YwLjMyMWMwLDIxLjIyMiw1Ljk3OSw0Mi4wMTYsMTcuMjM2LDYwLjAwOWwxMDMuNjcxLDE2NS41OTFjMy4wMjIsNC44MjYsNC41NDYsMTAuMzExLDQuNTQ2LDE1LjgxMgoJCWMwLDQuOTc0LTEuMjQ0LDkuOTQ4LTMuNzM5LDE0LjQ2Yy01LjI1NCw5LjQ3MS0xNS4yNDMsMTUuMzUxLTI2LjA2NCwxNS4zNTFjLTAuMDY2LDAtMC4wOTksMC0wLjE2NSwwbC0yNzQuMTcxLTAuMjk3CgkJYy0xMC44NDYtMC4wMDgtMjAuODI3LTUuOTEzLTI2LjA2NS0xNS40Yy0yLjQ3OC00LjUxMi0zLjcwNS05LjQ1NC0zLjcwNS0xNC40MTJjMC01LjUxOCwxLjUyNC0xMS4wMTgsNC41Ny0xNS44NTJsMTA0LjAyNi0xNjUuMzg1CgkJYzExLjMzMi0xOC4wMDIsMTcuMzQ0LTM4LjgyMSwxNy4zNjgtNjAuMWwwLjExNi0xMDcuMzY5SDE5Ni44MWwtMC4xMzIsMTA3LjM1M2MtMC4wMjUsMTcuODItNS4wNjQsMzUuMjc4LTE0LjU1Miw1MC4zNjUKCQlMNzguMTAxLDQzNy45NWMtNC45MTYsNy44MDctNy4zOTUsMTYuNzAxLTcuMzg2LDI1LjYxMWMtMC4wMDgsNy45ODgsMS45ODQsMTYuMDEsNS45ODYsMjMuMjU2CgkJYzguNDU4LDE1LjM1LDI0LjU5LDI0Ljg3LDQyLjA5OCwyNC44ODZMMzkzLjA5NCw1MTJsMC4wMDgtOS4xNjZWNTEyYzAuNDI4LDAsMC42NDMtMC4wMjQsMC42Ni0wLjAyNHYtMC4wMjUKCQljMTcuMjUyLTAuMjE0LDMzLjA5Ny05LjYzNSw0MS40ODgtMjQuNzQ2YzQuMDI3LTcuMjcyLDYuMDM2LTE1LjMyNiw2LjAzNi0yMy4zNDdDNDQxLjI4NSw0NTQuOTgsNDM4LjgyMyw0NDYuMTExLDQzMy45NDgsNDM4LjMxMnoKCQkiIHN0eWxlPSJmaWxsOiByZ2IoNzUsIDc1LCA3NSk7Ij48L3BhdGg+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTkzLjAwNSwzMzIuNzU1bC03MS41NTQsMTEzLjcyN2MtMy4wMjIsNC44MjUtMy4xOTUsMTAuOTItMC40NTMsMTUuODkzYzIuNzUsNC45OSw3Ljk5Niw4LjM1MSwxMy43MDMsOC4zNjcKCQloMjQyLjYwNmM1LjY5LDAsMTAuOTM2LTMuMDk2LDEzLjY4Ni04LjA3YzIuNzY4LTQuOTgyLDIuNjAyLTExLjA4NS0wLjQyLTE1LjkwMmwtNzEuMjkxLTExMy44ODIKCQljLTIuODgyLTQuNTg4LTcuODQtNy4zMzgtMTMuMjY2LTcuMzQ2bC05OS43NjgtMC4xMDdDMjAwLjgyOSwzMjUuNDM0LDE5NS44NzksMzI4LjE3NiwxOTMuMDA1LDMzMi43NTV6IE0yODcuNTY5LDQxMS43OTYKCQljNi4zMjUsMCwxMS40NTUsNS4xMjIsMTEuNDU1LDExLjQ1NWMwLDYuMzMyLTUuMTMsMTEuNDU1LTExLjQ1NSwxMS40NTVjLTYuMzMzLDAtMTEuNDU1LTUuMTIzLTExLjQ1NS0xMS40NTUKCQlDMjc2LjExNCw0MTYuOTE4LDI4MS4yMzYsNDExLjc5NiwyODcuNTY5LDQxMS43OTZ6IE0yMzIuNTc1LDM2Mi41MjVjOS40ODcsMCwxNy4xODYsNy42OTIsMTcuMTg2LDE3LjE4NwoJCWMwLDkuNDg3LTcuNywxNy4xNzgtMTcuMTg2LDE3LjE3OGMtOS40OTUsMC0xNy4xODctNy42OTItMTcuMTg3LTE3LjE3OEMyMTUuMzg4LDM3MC4yMTYsMjIzLjA4LDM2Mi41MjUsMjMyLjU3NSwzNjIuNTI1eiIgc3R5bGU9ImZpbGw6IHJnYig3NSwgNzUsIDc1KTsiPjwvcGF0aD4KPC9nPgo8L3N2Zz4K';
const menuIconURI = 'data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPy0tPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Il94MzJfIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJ3aWR0aDogMjU2cHg7IGhlaWdodDogMjU2cHg7IG9wYWNpdHk6IDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNEI0QjRCO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjUwLjg4MiwzNi44MjhjMTAuMTcxLDAuMDE2LDE4LjQzLTguMjI3LDE4LjQzOC0xOC4zOUMyNjkuMzI4LDguMjYsMjYxLjA5MywwLjAwOCwyNTAuOTIzLDAKCQljLTEwLjE3MS0wLjAwOC0xOC40MjIsOC4yMjctMTguNDMsMTguMzk3QzIzMi40NzcsMjguNTY4LDI0MC43MTEsMzYuODE5LDI1MC44ODIsMzYuODI4eiIgc3R5bGU9ImZpbGw6IHJnYig3NSwgNzUsIDc1KTsiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjAuMzQ0LDk5LjI1OGMwLjAwOC01Ljk3OS00LjgzNC0xMC44MzgtMTAuODEzLTEwLjgzOGMtNS45NzgsMC0xMC44MzcsNC44NDItMTAuODQ2LDEwLjgyMQoJCWMtMC4wMDgsNS45ODgsNC44NDIsMTAuODM4LDEwLjgzLDEwLjgzOEMyNTUuNDk0LDExMC4wODcsMjYwLjM0NCwxMDUuMjQ0LDI2MC4zNDQsOTkuMjU4eiIgc3R5bGU9ImZpbGw6IHJnYig3NSwgNzUsIDc1KTsiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjIuNDAzLDYwLjQ0NWMtMC4wMDgsNy4xNTcsNS43ODksMTIuOTU0LDEyLjk0NiwxMi45N2M3LjE0OCwwLDEyLjk0NS01Ljc4LDEyLjk1NC0xMi45NDUKCQljMC4wMDgtNy4xNDgtNS43ODEtMTIuOTQ2LTEyLjkyOS0xMi45NDZDMjY4LjIxNyw0Ny41MDgsMjYyLjQxMSw1My4yOTcsMjYyLjQwMyw2MC40NDV6IiBzdHlsZT0iZmlsbDogcmdiKDc1LCA3NSwgNzUpOyI+PC9wYXRoPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQzMy45NDgsNDM4LjMxMkwzMzAuMjc2LDI3Mi43M2MtOS40MzctMTUuMDc4LTE0LjQzNi0zMi41MDQtMTQuNDM2LTUwLjI4NGwwLjEzMS0xMDcuNTkxaC0xOC4zNDcKCQlsLTAuMTI0LDEwNy4yN3YwLjMyMWMwLDIxLjIyMiw1Ljk3OSw0Mi4wMTYsMTcuMjM2LDYwLjAwOWwxMDMuNjcxLDE2NS41OTFjMy4wMjIsNC44MjYsNC41NDYsMTAuMzExLDQuNTQ2LDE1LjgxMgoJCWMwLDQuOTc0LTEuMjQ0LDkuOTQ4LTMuNzM5LDE0LjQ2Yy01LjI1NCw5LjQ3MS0xNS4yNDMsMTUuMzUxLTI2LjA2NCwxNS4zNTFjLTAuMDY2LDAtMC4wOTksMC0wLjE2NSwwbC0yNzQuMTcxLTAuMjk3CgkJYy0xMC44NDYtMC4wMDgtMjAuODI3LTUuOTEzLTI2LjA2NS0xNS40Yy0yLjQ3OC00LjUxMi0zLjcwNS05LjQ1NC0zLjcwNS0xNC40MTJjMC01LjUxOCwxLjUyNC0xMS4wMTgsNC41Ny0xNS44NTJsMTA0LjAyNi0xNjUuMzg1CgkJYzExLjMzMi0xOC4wMDIsMTcuMzQ0LTM4LjgyMSwxNy4zNjgtNjAuMWwwLjExNi0xMDcuMzY5SDE5Ni44MWwtMC4xMzIsMTA3LjM1M2MtMC4wMjUsMTcuODItNS4wNjQsMzUuMjc4LTE0LjU1Miw1MC4zNjUKCQlMNzguMTAxLDQzNy45NWMtNC45MTYsNy44MDctNy4zOTUsMTYuNzAxLTcuMzg2LDI1LjYxMWMtMC4wMDgsNy45ODgsMS45ODQsMTYuMDEsNS45ODYsMjMuMjU2CgkJYzguNDU4LDE1LjM1LDI0LjU5LDI0Ljg3LDQyLjA5OCwyNC44ODZMMzkzLjA5NCw1MTJsMC4wMDgtOS4xNjZWNTEyYzAuNDI4LDAsMC42NDMtMC4wMjQsMC42Ni0wLjAyNHYtMC4wMjUKCQljMTcuMjUyLTAuMjE0LDMzLjA5Ny05LjYzNSw0MS40ODgtMjQuNzQ2YzQuMDI3LTcuMjcyLDYuMDM2LTE1LjMyNiw2LjAzNi0yMy4zNDdDNDQxLjI4NSw0NTQuOTgsNDM4LjgyMyw0NDYuMTExLDQzMy45NDgsNDM4LjMxMnoKCQkiIHN0eWxlPSJmaWxsOiByZ2IoNzUsIDc1LCA3NSk7Ij48L3BhdGg+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTkzLjAwNSwzMzIuNzU1bC03MS41NTQsMTEzLjcyN2MtMy4wMjIsNC44MjUtMy4xOTUsMTAuOTItMC40NTMsMTUuODkzYzIuNzUsNC45OSw3Ljk5Niw4LjM1MSwxMy43MDMsOC4zNjcKCQloMjQyLjYwNmM1LjY5LDAsMTAuOTM2LTMuMDk2LDEzLjY4Ni04LjA3YzIuNzY4LTQuOTgyLDIuNjAyLTExLjA4NS0wLjQyLTE1LjkwMmwtNzEuMjkxLTExMy44ODIKCQljLTIuODgyLTQuNTg4LTcuODQtNy4zMzgtMTMuMjY2LTcuMzQ2bC05OS43NjgtMC4xMDdDMjAwLjgyOSwzMjUuNDM0LDE5NS44NzksMzI4LjE3NiwxOTMuMDA1LDMzMi43NTV6IE0yODcuNTY5LDQxMS43OTYKCQljNi4zMjUsMCwxMS40NTUsNS4xMjIsMTEuNDU1LDExLjQ1NWMwLDYuMzMyLTUuMTMsMTEuNDU1LTExLjQ1NSwxMS40NTVjLTYuMzMzLDAtMTEuNDU1LTUuMTIzLTExLjQ1NS0xMS40NTUKCQlDMjc2LjExNCw0MTYuOTE4LDI4MS4yMzYsNDExLjc5NiwyODcuNTY5LDQxMS43OTZ6IE0yMzIuNTc1LDM2Mi41MjVjOS40ODcsMCwxNy4xODYsNy42OTIsMTcuMTg2LDE3LjE4NwoJCWMwLDkuNDg3LTcuNywxNy4xNzgtMTcuMTg2LDE3LjE3OGMtOS40OTUsMC0xNy4xODctNy42OTItMTcuMTg3LTE3LjE3OEMyMTUuMzg4LDM3MC4yMTYsMjIzLjA4LDM2Mi41MjUsMjMyLjU3NSwzNjIuNTI1eiIgc3R5bGU9ImZpbGw6IHJnYig3NSwgNzUsIDc1KTsiPjwvcGF0aD4KPC9nPgo8L3N2Zz4K';

class RikaExtension {
    constructor(runtime) {
        this.runtime = runtime
        this.tempo = 60;
        this.note = 60;
        this.filePath = './assets/60.mp3'
        this.player = null

        this._setPlayer()
    }

    getInfo() {
        return {
            id: 'rika',
            name: formatMessage({
                id: 'rika.categoryName',
                default: 'science',
                description: 'Label for the Science extension category'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'switchOn',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rika.switchOn',
                        default: 'Switch ON',
                        description: 'Switch On'
                    })
                },
                {
                    opcode: 'switchOff',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'rika.switchOff',
                        default: 'Switch OFF',
                        description: 'Switch Off'
                    })
                }
            ],
            arguments: {},
        }
    }

    switchOn(args, util) {
        console.log('switch on')
        if (util.runtime.audioEngine === null) return;
        if (util.target.sprite.soundBank === null) return;

        const player = this.player
        player.onEnded = function() {
            this.emit('stop')
            this.Playing = false
            this.play()
        }
        const engine = util.runtime.audioEngine

         // Create gain nodes for this note's volume, and chain them
         // to the output.
         const context = engine.audioContext;
         const volumeGain = context.createGain();
         volumeGain.gain.setValueAtTime(util.target.volume / 100, engine.currentTime);
         volumeGain.connect(engine.getInputNode());

        player.play()
        player.connect({getInputNode () {
            return volumeGain;
        }});
    }

    switchOff() {
        console.log('switch off')
        this.player.stop()
    }

    _setPlayer() {
        const soundBuffer = require('!arraybuffer-loader!./assets/60.mp3')
        return this._decodeSound(soundBuffer).then(player => {
            this.player = player;
        });
    }

    _decodeSound (soundBuffer) {
        const engine = this.runtime.audioEngine;

        if (!engine) {
            return Promise.reject(new Error('No Audio Context Detected'));
        }

        return engine.decodeSoundPlayer({data: {buffer: soundBuffer}});
    }

    static get STATE_KEY() {
        return 'Saggggo.rika'
    }
}

module.exports = RikaExtension
