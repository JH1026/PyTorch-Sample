import CapturePage from '../src/pages/capturePage';
import { render } from 'react-dom'

describe('CapturePage Test', () => {
    let container: HTMLDivElement
    beforeEach(() => {
        document.body.appendChild(container = document.createElement('div'))
    })
    afterEach(() => {
        document.body.removeChild(container)
    })

    it('Snapshot', () => {
        render(<CapturePage />, container)
        expect(container.innerHTML).toMatchSnapshot()
    })

})