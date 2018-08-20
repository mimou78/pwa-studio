import { RestApi } from '@magento/peregrine';

import { store } from 'src';
import actions from '../actions';
import {
    editOrder,
    resetCheckout,
    submitCart,
    submitInput
} from '../asyncActions';

jest.mock('src');

const { dispatch, getState } = store;
const thunkArgs = [dispatch, getState];
const { request } = RestApi.Magento2;

const address = {
    country_id: 'US',
    firstname: 'Veronica',
    lastname: 'Costello',
    street: ['6146 Honey Bluff Parkway'],
    city: 'Calder',
    postcode: '49628-7978',
    region_id: 33,
    region_code: 'MI',
    region: 'Michigan',
    telephone: '(555) 229-3326',
    email: 'veronica@example.com'
};

const countries = [
    { id: 'US', available_regions: [{ id: 33, code: 'MI', name: 'Michigan' }] }
];

beforeAll(() => {
    getState.mockImplementation(() => ({
        cart: { guestCartId: 'GUEST_CART_ID' },
        directory: { countries }
    }));
});

afterEach(() => {
    dispatch.mockClear();
    request.mockClear();
});

afterAll(() => {
    getState.mockRestore();
});

test('resetCheckout() returns a thunk', () => {
    expect(resetCheckout()).toBeInstanceOf(Function);
});

test('resetCheckout thunk returns undefined', async () => {
    const result = await resetCheckout()(...thunkArgs);

    expect(result).toBeUndefined();
});

test('resetCheckout thunk dispatches actions', async () => {
    await resetCheckout()(...thunkArgs);

    expect(dispatch).toHaveBeenNthCalledWith(1, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.reset());
    expect(dispatch).toHaveBeenCalledTimes(2);
});

test('editOrder() returns a thunk', () => {
    expect(editOrder()).toBeInstanceOf(Function);
});

test('editOrder thunk returns undefined', async () => {
    const result = await editOrder()(...thunkArgs);

    expect(result).toBeUndefined();
});

test('editOrder thunk dispatches actions', async () => {
    const payload = 'PAYLOAD';
    await editOrder(payload)(...thunkArgs);

    expect(dispatch).toHaveBeenCalledWith(actions.edit(payload));
    expect(dispatch).toHaveBeenCalledTimes(1);
});

test('submitCart() returns a thunk', () => {
    expect(submitCart()).toBeInstanceOf(Function);
});

test('submitCart thunk returns undefined', async () => {
    const result = await submitCart()(...thunkArgs);

    expect(result).toBeUndefined();
});

test('submitCart thunk dispatches actions', async () => {
    await submitCart()(...thunkArgs);

    expect(dispatch).toHaveBeenCalledWith(actions.cart.accept());
    expect(dispatch).toHaveBeenCalledTimes(1);
});

test('submitInput() returns a thunk', () => {
    expect(submitInput()).toBeInstanceOf(Function);
});

test('submitInput thunk returns undefined', async () => {
    const payload = { type: 'address', formValues: address };
    const result = await submitInput(payload)(...thunkArgs);

    expect(result).toBeUndefined();
});

test('submitInput thunk dispatches actions on success', async () => {
    const payload = { type: 'address', formValues: address };
    const response = true;

    request.mockResolvedValueOnce(response);
    await submitInput(payload)(...thunkArgs);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.input.submit(payload));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(4, actions.input.accept(response));
    expect(dispatch).toHaveBeenCalledTimes(4);
});

test('submitInput thunk dispatches actions on failure', async () => {
    const payload = { type: 'address', formValues: address };
    const error = new Error('ERROR');

    request.mockRejectedValueOnce(error);
    await submitInput(payload)(...thunkArgs);

    expect(dispatch).toHaveBeenNthCalledWith(1, actions.input.submit(payload));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.input.reject(error));
    expect(dispatch).toHaveBeenCalledTimes(3);
});

test('submitInput thunk throws if payload is invalid', async () => {
    const payload = { type: 'address', formValues: {} };

    await expect(submitInput(payload)(...thunkArgs)).rejects.toThrow();
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.input.submit(payload));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));
    expect(dispatch).toHaveBeenCalledTimes(2);
});
