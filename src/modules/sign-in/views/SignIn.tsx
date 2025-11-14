import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/card.tsx";
import {Input} from "@/shared/components/input.tsx";
import {Button} from "@/shared/components/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/form.tsx";
import {useSignInController} from "@/modules/sign-in/hooks/useSignInController.tsx";

export default function SignIn() {
    const {form, onSubmit, authError} = useSignInController()
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Card className="shadow-lg border border-gray-200">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold text-gray-900">Inicio de Sesion</CardTitle>
                        <p className="text-sm text-gray-600">Bienvenido al administrador Daga</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Correo Electrónico</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="correo@electronico.com" {...field}
                                                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Contraseña</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder="********" {...field}
                                                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {authError && (
                                    <span className="text-red-500">ERROR!! al iniciar sesion</span>
                                )}

                                <Button
                                    type="submit"
                                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-normal text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none transition antialiased [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-sm shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none h-10 px-4 py-2 w-full"
                                >
                                    Iniciar Sesion
                                </Button>
                            </form>
                        </Form>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
