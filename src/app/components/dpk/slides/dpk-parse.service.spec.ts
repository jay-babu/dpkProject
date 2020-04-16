import { TestBed } from '@angular/core/testing'

import { DpkParseService } from './dpk-parse.service'

describe('SlidesService', () => {
    let service: DpkParseService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(DpkParseService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
