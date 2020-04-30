const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWE5OThlYzhkN2ZhOTFlMmZhYmQ0ZDgiLCJpYXQiOjE1ODgxNzMwMzZ9.8V7-mRr3CHq6L5OKLrUCIsz2WXhEb1-Dc2aMm4O60ZE";

const signUp = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(token);
    }, 1000);
  });

const mockCred = {
  email: "test@test.com",
  password: "test",
};

const signIn = ({ email, password }: { email: string; password: string }) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (email === mockCred.email && password === mockCred.password) {
        resolve(token);
      } else {
        reject("Wrong email or password");
      }
    }, 1000);
  });

type Api = {
  signUp: () => Promise<string>;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<string>;
};

export const API: Api = {
  signUp,
  signIn,
};
