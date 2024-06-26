import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabins(newCabin, id) {
 const hasImagePath = newCabin.image?.startsWith?.(supabase);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://dcbxkylcdoplxbrecsfz.supabase.co
  //create/edit cabin
  let query = supabase.from("cabins");

  //create cabin
  
 let data, error;
 if (!id) {
   // Create cabin
   ({ data, error } = await query
     .insert([{ ...newCabin, image: imagePath }])
     .select()
     .single());
 } else {
   // Edit cabin
   ({ data, error } = await query
     .update({ ...newCabin, image: imagePath })
     .eq("id", id)
     .select()
     .single());
 }

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //  upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //delete cabin if there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not uploaded and cablin was not be created"
    );
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
