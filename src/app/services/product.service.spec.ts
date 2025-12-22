import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products (Happy Path)', () => {
    const dummyProducts = {
      data: [
        { productID: '1', productTitle: 'Product 1', productPrice: '100', category: 'Cat1' },
        { productID: '2', productTitle: 'Product 2', productPrice: '200', category: 'Cat2' }
      ]
    };

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].productTitle).toBe('Product 1');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should retrieve products with search parameter', () => {
    service.getProducts('test').subscribe();

    const req = httpMock.expectOne(req => 
      req.url ===(`${environment.apiUrl}/products`) && 
      req.params.has('search') && 
      req.params.get('search') === 'test'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ data: [] });
  });

  it('should retrieve products with category parameter', () => {
    service.getProducts('', 'electronics').subscribe();

    const req = httpMock.expectOne(req => 
      req.url ===(`${environment.apiUrl}/products`) && 
      req.params.has('category') && 
      req.params.get('category') === 'electronics'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ data: [] });
  });

  it('should handle API errors gracefully', () => {
    service.getProducts().subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });
});