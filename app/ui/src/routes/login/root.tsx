import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../supabase";

export default function LoginRoot() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.png"
            alt="Dialoqbase"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              This is just demo app, please don't use it for production
            </span>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Auth
              supabaseClient={supabase}
              providers={["github"]}
              appearance={{
                theme: ThemeSupa,
                extend: true,
              }}
              showLinks={false}
              magicLink={true}
              view="magic_link"
              localization={{
                variables: {
                  magic_link: {
                    button_label: "Send Magic Link",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
