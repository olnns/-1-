import { useState } from "react";
import { DEVICE_DATA_RETAINED_AFTER_LOGOUT, logoutLocalSession } from "./accountActions";

export default function LogoutFlowPanel({
  onBack,
  nicknameHint,
  onLogoutComplete,
}: {
  onBack: () => void;
  nicknameHint: string;
  onLogoutComplete?: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const canSubmit = agreed;

  const handleLogout = () => {
    if (!agreed) return;
    logoutLocalSession();
    window.alert(
      "로그아웃했어요.\n저장된 회원 정보와 로그인 정보는 그대로입니다.\n첫 화면(스플래시)부터 다시 시작해요. 기존 사용자로 로그인하면 이전처럼 이용할 수 있어요."
    );
    onLogoutComplete?.();
  };

  return (
    <div className="border-t border-slate-200 px-5 py-6">
      <p className="text-[13px] font-medium leading-relaxed text-slate-600">
        로그아웃하면 <span className="font-bold text-slate-800">로그인 세션만 종료</span>합니다. 회원 정보·저장된
        아이디·비밀번호·프로필·주문 내역 등은 이 기기에 그대로 남으며, 같은 계정으로 다시 로그인하면{" "}
        <span className="font-bold text-slate-800">이전과 동일하게</span> 이용할 수 있습니다.
      </p>

      {nicknameHint ? (
        <p className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-[13px] font-semibold text-slate-800">
          현재 로그인(저장) 정보: <span className="text-[#FF853E]">{nicknameHint}</span>
        </p>
      ) : null}

      <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">로그아웃 후에도 유지</p>
      <ul className="mt-2 space-y-3">
        {DEVICE_DATA_RETAINED_AFTER_LOGOUT.map((row) => (
          <li key={row.title} className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 px-4 py-3">
            <span className="mt-0.5 text-emerald-600" aria-hidden>
              ✓
            </span>
            <div>
              <p className="text-[13px] font-bold text-slate-900">{row.title}</p>
              <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-slate-600">{row.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-[#FF853E] focus:ring-[#FF853E]"
        />
        <span className="text-[13px] font-medium leading-relaxed text-slate-700">
          위 내용을 확인했으며, 세션만 종료하고 로그아웃합니다.
        </span>
      </label>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-bold text-slate-700"
        >
          취소
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleLogout}
          className="flex-1 rounded-2xl bg-[#FF853E] py-3.5 text-sm font-bold text-white transition hover:bg-[#FF6F1F] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
