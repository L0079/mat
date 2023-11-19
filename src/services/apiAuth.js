import supabase, { SUPABASE_URL } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  //  console.log("apiAuth", email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();
  //  console.log("getCurrentUser", data);
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return error;
}

export async function updateUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `Av-${Math.random()
    .toString()
    .replace("0.", "")}-${avatar.name.replace(" ", "")}`;
  const fileURL = `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  updateData = { data: { avatar: fileURL } };
  const { data: dataAv, error: errorAv } = await supabase.auth.updateUser(
    updateData
  );
  if (errorAv) throw new Error(errorAv.message);

  return dataAv;
}
