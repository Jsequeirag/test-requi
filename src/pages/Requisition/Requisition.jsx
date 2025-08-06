import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import TextButton from "../../components/Button/TextButton";
function Requisition() {
  const navigate = new useNavigate();
  const onSubmit = () => {
    mutate({
      content: post,
    });
  };

  return (
    <Layout>
      <div className="m-4 w-full">
        <div className="border-b  bg-white rounded-sm w-[86%]">
          <div className="flex items-center border-b p-4 mx-2">
            <TextButton
              onClick={() => {
                navigate("/supervisor");
              }}
              text={"Atras"}
            />
            <p>{state.toString}</p>
            {/*Titulo */}
            <h1 className="px-9 text-3xl p-4">Formulario de Requisición</h1>
          </div>
          {/*formulario*/}
          <form action="" className="p-10">
            {/*seleccionar Acción*/}
            {/*row 1 */}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Acción
                </label>
                <select
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  name=""
                  id=""
                >
                  {" "}
                  <option value="FR">Sálida</option>
                  <option value="DE">Entrada</option>
                </select>
              </div>
              <div className="flex-1 m-5"></div>
            </div>
            {/*Info Empleado */}
            <h1 className="text-2xl">Información de Empleado</h1>
            {/*row 2 - empleado*/}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Nombre
                </label>
                <input
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  id="name"
                  type="text"
                  name="name"
                  value={"Ana berrocal Goldberg"}
                  placeholder="Nombre de empleado"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  # Exactus
                </label>
                <input
                  className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  disabled
                  id="idExactus"
                  type="text"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  value={"12345"}
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>
            {/*row 3 - supervisor*/}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Supervisor
                </label>
                <input
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  id="name"
                  type="text"
                  name="name"
                  disabled
                  value={"Arnold Golberg Rodriguez"}
                  placeholder="Nombre de supervisor"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  # Código de Posición
                </label>
                <input
                  className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  disabled
                  id="idExactus"
                  type="text"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  value={"54321"}
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            {/*row 4 - grado - departamento*/}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Grado
                </label>
                <input
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  id="name"
                  type="text"
                  name="name"
                  disabled
                  value={"Grado A"}
                  placeholder="Nombre de supervisor"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Departamento
                </label>
                <input
                  className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  disabled
                  id="idExactus"
                  type="text"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  value={"Departamento A"}
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            {/*row 5 - proyecto - fecha ingreso*/}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Proyecto
                </label>
                <input
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  id="name"
                  type="text"
                  name="name"
                  disabled
                  value={"Proyecto A"}
                  placeholder="Nombre de supervisor"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Fecha de Ingreso
                </label>
                <input
                  className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  disabled
                  id="idExactus"
                  type="date"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  value={"11-04-2000"}
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            {/*Info acción*/}
            <h1 className="text-2xl">Información de Acción</h1> {/*renuncia */}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Motivo
                </label>
                <select
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  name=""
                  id=""
                >
                  <option value="FR" selected>
                    Despido
                  </option>
                  <option value="DE">Renuncia</option>
                </select>
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Carta de Renuncia
                </label>
                <input
                  className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  id="idExactus"
                  type="file"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Tipo de Despido
                </label>
                <select
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  name=""
                  id=""
                >
                  <option value="FR" selected>
                    Rform
                  </option>
                </select>
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Cform
                </label>
                <input
                  className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
                  disabled
                  id="idExactus"
                  value="2343"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Recontratable
                </label>
                <select
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  name=""
                  id=""
                >
                  <option value="FR" selected>
                    Sí
                  </option>{" "}
                  <option value="FR" selected>
                    No
                  </option>
                </select>
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Fecha Oficial de Salida
                </label>
                <input
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  type="date"
                  id="idExactus"
                  value="2343"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Fecha Real de Salida
                </label>
                <input
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  type="date"
                  id="idExactus"
                  value="2343"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Fecha Entrega de Equipo
                </label>
                <input
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  type="date"
                  id="idExactus"
                  value="2343"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Fecha Real de Salida
                </label>
                <input
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none"
                  disabled
                  type="text"
                  id="idExactus"
                  value="85022903"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Correo Personal
                </label>
                <input
                  disabled
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none"
                  type="text"
                  id="idExactus"
                  value="JOSE@GMAIL.COM"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Motivo
                </label>
                <select
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  name=""
                  id=""
                >
                  {" "}
                  <option value="FR" selected>
                    Motivo A
                  </option>
                  <option value="DE">Motivo B</option>
                </select>
              </div>
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Nueva Empresa
                </label>
                <input
                  disabled
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none"
                  type="text"
                  id="idExactus"
                  value="Orbitas"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>{" "}
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Comentario
                </label>
                <textarea
                  disabled
                  className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none h-[200px]"
                  type="text"
                  id="idExactus"
                  value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                  name="idExactus"
                  placeholder="Dígite su usuario"
                  onChange={() => {}}
                  /* required*/
                  autoComplete="off"
                />
              </div>
            </div>
            {/*button*/}
            <div className="w-full flex justify-center items-center border-t py-4">
              <TextButton
                onClick={() => {
                  navigate("/home");
                }}
                text={"Enviar"}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Requisition;
