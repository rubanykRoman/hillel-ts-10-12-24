type TSuccess<T> = {
  status: 'success';
  data: T;
};

type TError = {
  status: 'error';
  error: string;
};

type Result<T> = TSuccess<T> | TError;

function handleResult<T>(result: Result<T>): T | never {
  if (result.status === 'success') {
    return result.data;
  } else {
    throw new Error(result.error);
  }
}

//examples
const successResult: TSuccess<number> = { status: 'success', data: 42 };
const errorResult: TError = { status: 'error', error: 'Something went wrong' };

console.log('Success result:', handleResult(successResult));
console.log('Error result:', handleResult(errorResult));
