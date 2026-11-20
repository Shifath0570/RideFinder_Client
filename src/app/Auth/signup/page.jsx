
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car,
  User,
  Mail,
  Lock,
  Upload,
  IdCard,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [nidPhoto, setNidPhoto] = useState(null);
  const [nidPreview, setNidPreview] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e, type) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Each image must be smaller than ${maxSizeMB}MB.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    if (type === "profile") {
      setProfileImage(file);
      setProfilePreview(previewUrl);
    } else if (type === "nid") {
      setNidPhoto(file);
      setNidPreview(previewUrl);
    }
  };

  const uploadFileToStorage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }
    if (!profileImage) {
      setError("Please upload your profile image.");
      return;
    }
    if (!nidPhoto) {
      setError("Please upload your NID card photo.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create Firebase Authentication user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
      const user = userCredential.user;

      // 2. Upload Profile Image & NID Card Photo to Firebase Storage
      const [profileImageUrl, nidCardPhotoUrl] = await Promise.all([
        uploadFileToStorage(
          profileImage,
          `users/${user.uid}/profile_${Date.now()}_${profileImage.name}`
        ),
        uploadFileToStorage(
          nidPhoto,
          `users/${user.uid}/nid_${Date.now()}_${nidPhoto.name}`
        ),
      ]);

      // 3. Update Auth profile displayName & photoURL
      await updateProfile(user, {
        displayName: formData.name.trim(),
        photoURL: profileImageUrl,
      });

      // 4. Save user profile & NID verification record in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        image: profileImageUrl,
        nidCardPhoto: nidCardPhotoUrl,
        nidVerified: false,
        role: "rider",
        createdAt: serverTimestamp(),
      });

      setSuccess("Account created successfully! Welcome to RideFinder.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setProfileImage(null);
      setProfilePreview("");
      setNidPhoto(null);
      setNidPreview("");
    } catch (err) {
      const codeMap = {
        "auth/email-already-in-use":
          "This email is already registered. Try signing in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password is too weak. Use at least 6 characters.",
      };
      setError(codeMap[err.code] || err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-200/90 p-6 sm:p-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-3">
            <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-sm">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Ride<span className="text-emerald-600">Finder</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Provide your details and NID verification photo to get started
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3.5 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-sm text-emerald-800">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tanvir Hasan"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tanvir@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Profile Image & NID Card Photo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Profile Image */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Profile Image
              </label>
              <label className="flex flex-col items-center justify-center h-36 rounded-2xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50/30 transition cursor-pointer overflow-hidden p-2">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-gray-500 px-3">
                    <Upload className="h-6 w-6 text-emerald-600 mb-1.5" />
                    <span className="text-xs font-semibold text-gray-700">
                      Upload Profile Photo
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profile")}
                  className="hidden"
                />
              </label>
            </div>

            {/* NID Card Photo */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                NID Card Photo
              </label>
              <label className="flex flex-col items-center justify-center h-36 rounded-2xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50/30 transition cursor-pointer overflow-hidden p-2">
                {nidPreview ? (
                  <img
                    src={nidPreview}
                    alt="NID card preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-gray-500 px-3">
                    <IdCard className="h-6 w-6 text-emerald-600 mb-1.5" />
                    <span className="text-xs font-semibold text-gray-700">
                      Upload NID Card Photo
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      Clear front side photo
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "nid")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-3 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-10 py-3 text-sm bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account & Uploading Photos...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/Auth/signin"
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}








