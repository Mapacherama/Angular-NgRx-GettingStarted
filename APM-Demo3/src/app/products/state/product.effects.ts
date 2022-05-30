import { Injectable } from '@angular/core';

import { mergeMap, map, concatMap, catchError } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { ProductService } from '../product.service';

/* NgRx */
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductPageActions, ProductApiActions } from './actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap((action) =>
        this.productService.getProducts().pipe(
          map((products) => ProductApiActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductApiActions.loadProductsFailure({ error })))))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductApiActions.updateProductSuccess({ product })),
          catchError((error) => of(ProductApiActions.updateProductFailure({ error })))))
    );
  });
}
